# Methodology and limits

## Data

505 positive synthetic prices, generated from a seeded log-price process. The seed is 17 in the included run. Time steps have no real market date or ticker. Changing the seed changes the sample; the example is not tuned to demonstrate a favourable return.

## Signal and execution convention

For period `t`, exposure is one when the trailing lookback return through `t-1` is positive and zero otherwise. The signal never reads price `t` or future observations. Strategy return is `exposure[t] * (price[t]/price[t-1] - 1)` minus a cost proportional to absolute exposure change.

This is a deliberately simplified period convention. It assumes the decision through `t-1` can be held for the entire following close-to-close interval. Real execution requires timestamps, an executable price, latency, spread/slippage and order-fill modelling. A lag by itself does not establish a realistic backtest.

## Diagnostics

Equity compounds net returns from 1. Drawdown is equity divided by its running maximum minus one. Trailing volatility uses sample standard deviation over the configured lookback and scales by the square root of the stated periods per year. Annualisation assumes 252 equal periods per year; no exchange calendar is used. Warm-up volatility is null until enough observations exist.

## Validation

Eight tests cover seeded reproducibility, flat series, lagged signals, future-data perturbations, transaction costs, a known drawdown, input validation and missing warm-up values. The browser implementation should be checked against the same Python reference run before publication.

## Future research

Independent historical datasets, survivorship-bias controls, corporate-action handling, walk-forward validation, execution costs, missing-data policies and sensitivity checks would be needed for serious empirical work. No predictive edge, production readiness, investment performance or personal trading achievement is claimed here.
