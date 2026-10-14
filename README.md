# Systems Research Lab

CAD, quantitative models, geospatial tools and engineering utilities.

[Open portfolio](https://007jackiegao-cmd.github.io/systems-research-lab/)

| Project | Contents |
|---|---|
| [SMART3D](https://github.com/007jackiegao-cmd/smart3d-showcase) | Parametric solids, assemblies and GLB/BOM export |
| [Quant Signal Lab](https://github.com/007jackiegao-cmd/quant-signal-lab) | Momentum backtest, costs and risk charts |
| [Scenario Intelligence Lab](https://github.com/007jackiegao-cmd/scenario-intelligence-lab) | Event map, scenario scores and contribution table |
| Mission Review Lab | Task preparation, records and review screens |
| Engineering utilities | Thermal model and asynchronous provider cache |

## Run

```sh
npm ci
npm run dev
npm run build
```

```sh
python3 -m unittest -v test_algorithms.py test_backtest.py
node test-parity.js
node test-scenario.js
python3 thermal_model.py
python3 resilient_cache.py
```

The apps use sample datasets. Quant and scenario calculations are also available in their individual repositories. Pages is built from source by GitHub Actions; generated files are kept out of Git.
