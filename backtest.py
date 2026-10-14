"""New AI-assisted educational research example; synthetic data only by default."""
from dataclasses import dataclass, asdict
import argparse
import json
import math
import random
import statistics


@dataclass(frozen=True)
class Config:
    lookback: int = 21
    cost_bps: float = 5
    periods_per_year: int = 252

    def __post_init__(self):
        if isinstance(self.lookback,bool) or not isinstance(self.lookback,int) or self.lookback < 1:
            raise ValueError('Lookback must be a positive integer')
        if not math.isfinite(self.cost_bps) or not 0 <= self.cost_bps <= 1000:
            raise ValueError('Cost must be finite, in [0,1000] basis points')
        if isinstance(self.periods_per_year,bool) or not isinstance(self.periods_per_year,int) or self.periods_per_year < 1:
            raise ValueError('Periods per year must be a positive integer')


def synthetic_prices(samples=505,seed=17):
    if not isinstance(samples,int) or samples < 2:
        raise ValueError('At least two samples are required')
    rng=random.Random(seed)
    values=[100.0]
    for step in range(1,samples):
        drift=.0002+math.sin(step/37)*.0004
        shock=rng.gauss(0,.011)
        values.append(values[-1]*math.exp(drift+shock))
    return values


def drawdowns(equity):
    peak=equity[0]
    result=[]
    for value in equity:
        peak=max(peak,value)
        result.append(value/peak-1)
    return result


def backtest(prices,config=Config()):
    if len(prices)<2 or any(not math.isfinite(p) or p<=0 for p in prices):
        raise ValueError('Prices must contain at least two positive finite values')
    positions=[0.0]*len(prices)
    gross=[0.0]*len(prices)
    net=[0.0]*len(prices)
    turnover=[0.0]*len(prices)
    equity=[1.0]*len(prices)
    benchmark=[p/prices[0] for p in prices]
    for t in range(1,len(prices)):
        # Only prices observed before period t determine period-t exposure.
        if t-1 >= config.lookback:
            signal=prices[t-1]/prices[t-1-config.lookback]-1
            positions[t]=1.0 if signal>0 else 0.0
        turnover[t]=abs(positions[t]-positions[t-1])
        gross[t]=positions[t]*(prices[t]/prices[t-1]-1)
        net[t]=gross[t]-turnover[t]*config.cost_bps/10000
        if 1+net[t] <= 0:
            raise ValueError('This simplified period convention produces non-positive equity')
        equity[t]=equity[t-1]*(1+net[t])
    dd=drawdowns(equity)
    rolling=[]
    for t in range(len(prices)):
        window=net[max(1,t-config.lookback+1):t+1]
        rolling.append(statistics.stdev(window)*math.sqrt(config.periods_per_year)
                       if len(window)>=config.lookback and len(window)>=2 else None)
    returns=net[1:]
    metrics={'sample_count':len(prices),'total_return':equity[-1]-1,
             'annualised_return':equity[-1]**(config.periods_per_year/(len(prices)-1))-1,
             'annualised_volatility':statistics.stdev(returns)*math.sqrt(config.periods_per_year) if len(returns)>1 else 0,
             'max_drawdown':min(dd),'total_turnover':sum(turnover),
             'exposure_changes':sum(x>0 for x in turnover),'final_equity':equity[-1]}
    return {'config':asdict(config),'metrics':metrics,'prices':list(prices),
            'positions':positions,'gross_returns':gross,'net_returns':net,
            'turnover':turnover,'equity':equity,'benchmark_equity':benchmark,
            'drawdown':dd,'rolling_volatility':rolling}


def example(seed=17,lookback=21,cost_bps=5):
    result=backtest(synthetic_prices(seed=seed),Config(lookback=lookback,cost_bps=cost_bps))
    result['data_provenance']={'kind':'synthetic','seed':seed,'samples':505,
      'generator':'seeded log-price series; illustrative time steps, not actual calendar dates',
      'development':'AI-assisted educational demonstration with synthetic data',
      'execution':'positions depend on closes through t-1; turnover cost charged in period t'}
    return result


if __name__=='__main__':
    parser=argparse.ArgumentParser(description='Synthetic quantitative research demonstration')
    parser.add_argument('--seed',type=int,default=17)
    parser.add_argument('--lookback',type=int,default=21)
    parser.add_argument('--cost-bps',type=float,default=5)
    args=parser.parse_args()
    print(json.dumps(example(args.seed,args.lookback,args.cost_bps),indent=2,allow_nan=False))
