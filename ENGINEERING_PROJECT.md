# Engineering Computation Lab

### Numerical models with visible assumptions. Data retrieval with explicit failure paths.

Inspectable Python examples covering two engineering concerns: numerical thermal modelling and resilient asynchronous data retrieval. Both use the standard library and expose the calculation or state transition directly.

## Numerical thermal modelling

The example fits a fan pressure/flow polynomial, solves a channel pressure balance, estimates thermal resistance and compares fin-height/fin-count sweeps. Outputs include a pressure residual, convergence details and an explicit extrapolation flag.

Regression checks establish numerical consistency for selected reference cases. They do not validate a physical heat sink. Correlations, air properties, leakage and steady-state assumptions require experimental assessment before practical use.

## Resilient asynchronous cache

The cache coalesces concurrent callers for a key, attempts declared fallback providers, enforces freshness/stale-age limits and bounds storage with LRU eviction. Cancellation of one waiting caller leaves the shared fetch intact.

The providers are synthetic. No private data source, live market account, credential or original production integration is included.

## Run and verify

```sh
python3 thermal_model.py
python3 resilient_cache.py
python3 -m unittest -v test_algorithms.py
```

Eleven tests inspect thermal references, root/input handling, convergence, extrapolation, fallback, call coalescing, stale expiry, cancellation and capacity. These AI-assisted public examples are separate from original private research implementations.
