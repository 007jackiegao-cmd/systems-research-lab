"""Thermal resistance models in SI units."""
from dataclasses import dataclass, asdict
import json
import math


def bisect_root(fn, low, high, tolerance=1e-12, max_iterations=200):
    """Solve a finite, bracketed scalar equation; report invalid brackets."""
    if not low < high or tolerance <= 0 or max_iterations < 1:
        raise ValueError('Invalid solver bounds or convergence settings')
    fl, fh = fn(low), fn(high)
    if not math.isfinite(fl) or not math.isfinite(fh):
        raise ValueError('Non-finite endpoint')
    if fl == 0:
        return low
    if fh == 0:
        return high
    if (fl > 0) == (fh > 0):
        raise ValueError('Root is not bracketed')
    for _ in range(max_iterations):
        mid = (low + high) / 2
        fm = fn(mid)
        if not math.isfinite(fm):
            raise ValueError('Non-finite residual')
        if fm == 0 or high - low <= tolerance:
            return mid
        if (fl > 0) == (fm > 0):
            low, fl = mid, fm
        else:
            high = mid
    raise RuntimeError('Root solver did not converge')


def cubic_fit(xs, ys):
    """Small least-squares polynomial fit using pivoted elimination.

    Flow is scaled to L/s before fitting to avoid badly scaled SI powers.
    For larger modelling work use a QR/SVD numerical library.
    """
    if len(xs) != len(ys) or len(xs) < 4:
        raise ValueError('At least four paired values are required')
    matrix = [[sum(x ** (i+j) for x in xs) for j in range(4)] +
              [sum(y*x**i for x, y in zip(xs, ys))] for i in range(4)]
    for col in range(4):
        pivot = max(range(col, 4), key=lambda r: abs(matrix[r][col]))
        matrix[col], matrix[pivot] = matrix[pivot], matrix[col]
        divisor = matrix[col][col]
        if abs(divisor) < 1e-14:
            raise ValueError('Singular polynomial fit')
        matrix[col] = [v/divisor for v in matrix[col]]
        for row in range(4):
            if row != col:
                factor = matrix[row][col]
                matrix[row] = [a-factor*b for a, b in zip(matrix[row], matrix[col])]
    return [matrix[row][-1] for row in range(4)]


FLOW_LPS = [0, .472, .944, 1.416, 1.888, 2.360, 2.832, 3.304, 3.776, 4.247, 4.606]
PRESSURE_PA = [293.2, 274.6, 235.4, 196.1, 156.9, 127.5, 98.1, 68.6, 49, 29.4, 0]
FAN_FIT = cubic_fit(FLOW_LPS, PRESSURE_PA)


def fan_pressure(q):
    x = q * 1000
    return sum(c*x**i for i, c in enumerate(FAN_FIT))


@dataclass(frozen=True)
class Geometry:
    fins: int = 14
    height: float = .035
    length: float = .060
    width: float = .060
    thickness: float = .0015
    base_thickness: float = .010
    conductivity: float = 200

    def __post_init__(self):
        if isinstance(self.fins, bool) or not isinstance(self.fins, int) or self.fins < 2:
            raise ValueError('Fin count must be an integer >= 2')
        for name in ['height','length','width','thickness','base_thickness','conductivity']:
            value = getattr(self, name)
            if not math.isfinite(value) or value <= 0:
                raise ValueError(f'{name} must be positive and finite')
        if self.fins*self.thickness >= self.width:
            raise ValueError('Fin channels must have positive width')

    @property
    def spacing(self):
        return (self.width-self.fins*self.thickness)/(self.fins-1)


def system_pressure(q, g):
    if q < 0 or not math.isfinite(q):
        raise ValueError('Flow must be finite and non-negative')
    if q == 0:
        return 0.0
    b = g.spacing
    velocity = q/(g.width*g.height)*(1+g.thickness/b)
    dh = 2*b*g.height/(b+g.height)
    reynolds = 1.184*velocity*dh/1.849e-5
    aspect = b/g.height
    fre = 24-32.527*aspect+46.721*aspect**2-40.829*aspect**3+22.954*aspect**4-6.089*aspect**5
    lstar = g.length/(dh*reynolds)
    fapp = math.sqrt((3.44/math.sqrt(lstar))**2+fre**2)/reynolds
    sigma = 1-g.fins*g.thickness/g.width
    kc, ke = .42*(1-sigma**2), (1-sigma**2)**2
    return (fapp*g.fins*(2*g.height*g.length+b*g.length)/(g.height*g.width)+kc+ke)*.5*1.184*velocity**2


def resistance(h, g):
    if not math.isfinite(h) or h <= 0:
        raise ValueError('Heat-transfer coefficient must be positive and finite')
    perimeter, area = 2*(g.length+g.thickness), g.length*g.thickness
    m = math.sqrt(h*perimeter/(g.conductivity*area))
    rfin = 1/(math.sqrt(h*perimeter*g.conductivity*area)*math.tanh(m*g.height))
    return 1/(g.fins/rfin+h*(g.fins-1)*g.spacing*g.length)+g.base_thickness/(g.conductivity*g.length*g.width)


def forced_convection(g=Geometry()):
    q = bisect_root(lambda flow: fan_pressure(flow)-system_pressure(flow,g), 0, .005)
    velocity = q/(g.width*g.height)*(1+g.thickness/g.spacing)
    re_star = 1.184*velocity*g.spacing**2/(1.849e-5*g.length)
    pr = .7296
    a = (re_star*pr/2)**(-3)
    b = (.664*math.sqrt(re_star)*pr**(1/3)*math.sqrt(1+3.65/math.sqrt(re_star)))**(-3)
    h = (a+b)**(-1/3)*.02551/g.spacing
    return {'flow_m3_s':q,'flow_L_s':q*1000,'pressure_Pa':fan_pressure(q),
            'h_W_m2K':h,'resistance_K_W':resistance(h,g),
            'pressure_residual_Pa':fan_pressure(q)-system_pressure(q,g),
            'fan_fit_extrapolated':q*1000 > max(FLOW_LPS)}


def natural_convection(g=Geometry(), heat_W=21.72, tolerance_K=.001, max_iterations=200):
    if not math.isfinite(heat_W) or heat_W <= 0 or tolerance_K <= 0 or max_iterations < 1:
        raise ValueError('Invalid heat input or convergence settings')
    nu = 2.053e-5/1.030
    alpha = .02881/(1.030*1008)
    beta = 1/(70+273.15)
    dt = 50.0
    for iteration in range(1,max_iterations+1):
        rayleigh = 9.81*beta*dt*g.spacing**3/(nu*alpha)
        el = rayleigh*g.spacing/g.height
        nusselt = el/24*(-math.expm1(-35/el))**.75
        h = nusselt*.02881/g.spacing
        r = resistance(h,g)
        target = heat_W*r
        if abs(target-dt) < tolerance_K:
            return {'resistance_K_W':r,'delta_T_K':target,'h_W_m2K':h,
                    'iterations':iteration,'convergence_residual_K':abs(target-dt)}
        dt = .6*target+.4*dt
    raise RuntimeError('Natural-convection iteration did not converge')


def example():
    return {'baseline_geometry_SI':asdict(Geometry()),'forced_convection':forced_convection(),
            'natural_convection':natural_convection(),
            'height_sweep':[{'height_mm':h,**forced_convection(Geometry(height=h/1000))} for h in range(15,41,5)],
            'fin_sweep':[{'fins':n,**forced_convection(Geometry(fins=n))} for n in range(8,23,2)]}


if __name__ == '__main__':
    print(json.dumps(example(),indent=2,allow_nan=False))
