# Validation · Quant Signal Lab

## Python reference

Eight existing tests exercise seeded reproducibility, flat prices, lagged signals, future-data perturbation, explicit turnover costs, drawdown, invalid inputs and missing volatility warm-up values.

## JavaScript/Python consistency

`test-parity.js` runs the Python reference and compares the JavaScript result for four seed/lookback/cost configurations. Positions and exposure-change counts must match exactly. Net returns, equity, drawdown and volatility are checked with an absolute tolerance of 1e−12. Missing warm-up values must remain null.

These checks establish consistency for the stated computations. They do not prove a realistic execution model or investment performance. No real ticker, exchange calendar, broker account or private market record is used.

## Browser workflow

The deployed interface is checked for changing assumptions, switching equity/risk/data views and loading the local synthetic fixture. Interface previews are actual screenshots using those fixtures.

## Empirical work still required

Independent market data, timestamp and fill modelling, spreads/slippage, corporate actions, survivorship-bias controls, walk-forward evaluation and sensitivity studies would be required before empirical conclusions. Validation does not certify production readiness or a trading edge.
