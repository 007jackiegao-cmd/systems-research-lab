# Quant Signal Lab

### Research the signal. Inspect the risk.

An executable quantitative research workbench connecting **reproducible data, time-aligned signals, explicit implementation costs and transparent risk diagnostics**.

Quant Signal Lab makes the research process inspectable. Change the lookback or cost assumption and follow the result through exposure, net equity, drawdown and trailing volatility. A Python reference and a separately inspectable JavaScript implementation expose the same computational convention.

**[Launch the research workbench](https://007jackiegao-cmd.github.io/quant-signal-lab/)** · [Methodology](QUANT_METHODOLOGY.md) · [Architecture](QUANT_ARCHITECTURE.md) · [Validation](QUANT_VALIDATION.md)

![Actual quantitative research workbench](quant-preview.jpg)

## Capabilities you can inspect

| Capability | Implementation |
|---|---|
| **Reproducible experiments** | 505 generated price observations from a seeded log-price process |
| **Time-aligned exposure** | Long/cash momentum using prices available through the preceding period |
| **Cost-aware returns** | Explicit turnover costs applied to absolute exposure changes |
| **Risk diagnostics** | Net equity, running-peak drawdown and trailing sample volatility |
| **Interactive assumption checks** | Lookback and cost controls rerun the actual calculation |
| **Cross-language reference** | Python and JavaScript implementations with field-by-field parity checks |

The dataset is synthetic. Displayed changes and risk values belong to this generated experiment; they are not investment-performance evidence.

## Computational evidence

Eight Python tests cover reproducibility, flat series, signal lag, future-data perturbation, costs, drawdown, invalid input and volatility warm-up. A separate parity check compares positions, net returns, equity, drawdown, volatility and exposure-change counts against the Python reference across several configurations. See [validation](QUANT_VALIDATION.md) for the exact scope.

## Run and inspect

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://localhost:8080` in a recent browser. The application requires no account, provider key or external data feed.

```sh
python3 backtest.py --seed 17 --lookback 21 --cost-bps 5
python3 -m unittest -v test_backtest.py
node test-parity.js
```

Python standard library and Node.js only. The unminified `research-ui.js` exposes the browser calculation directly.

## Research scope

This AI-assisted public demonstration uses a simplified period execution convention. Empirical research would require timestamp alignment, executable prices, spread/slippage, order fills, corporate actions and independent datasets. No trading connection, predictive edge or production readiness is claimed.

No personal biography, accounts, holdings, original private source or credentials are included. [Publication scope](CONTENT_INVENTORY.md) documents the public/private boundary.
