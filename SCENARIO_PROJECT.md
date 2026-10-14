# Scenario Intelligence Lab

### See the context. Trace the scenario.

A situational-awareness workbench connecting **geospatial event context, explicit scenario assumptions, contribution-level attribution and opposing-effect detection**.

Scenario Intelligence Lab makes the path from input to score visible. Explore a synthetic event register on a world map, isolate a category, change a hypothesis and inspect the signed contribution of every active event to each illustrative research basket.

**[Launch the scenario workbench](https://007jackiegao-cmd.github.io/scenario-intelligence-lab/)** · [Methodology](SCENARIO_METHODOLOGY.md) · [Architecture](SCENARIO_ARCHITECTURE.md) · [Validation](SCENARIO_VALIDATION.md)

![Actual situational-awareness workbench](scenario-preview.jpg)

## Capabilities you can inspect

| Capability | Implementation |
|---|---|
| **Geospatial context** | Locally served world geometry with fictional example markers |
| **Event exploration** | Six synthetic logistics, energy and environment events |
| **Scenario comparison** | Explicit base, disruption and recovery multipliers |
| **Contribution attribution** | Signed per-event components displayed in an audit table |
| **Opposing-effect detection** | Positive and negative components flagged together |
| **Deterministic aggregation** | Duplicate IDs counted once; defined empty-input behaviour |

The map provides context. Events, weights and shocks are illustrative; scores are arbitrary model units, without calibrated probabilities, expected returns or operational threat claims.

## Computational evidence

Seven checks cover weighted aggregation, scenario scaling, opposing components, duplicate IDs, empty input and invalid data. The browser integration is checked for category filtering, scenario changes and agreement between the score and contribution table. See [validation](SCENARIO_VALIDATION.md).

## Run and inspect

```sh
python3 -m http.server 8080 --bind 127.0.0.1
node test-scenario.js
```

Open `http://localhost:8080`. `scenario-engine.js` exposes the arithmetic and `scenario-app.js` exposes the synthetic fixtures and UI. There is no backend login, provider key, analytics component or external data request. Map geometry and libraries are bundled locally.

## Project scope

This AI-assisted public prototype demonstrates a focused event → scenario → attribution workflow. It does not claim a live news feed, calibrated forecasting, active AI provider, private account lens or automated action engine. Original private research modules and operational records remain outside the public package.

[Publication provenance](CONTENT_INVENTORY.md) records the data and privacy boundary. Bundled dependencies retain their upstream licenses: Leaflet (BSD-2-Clause), topojson-client (ISC), and world-atlas (ISC package; Natural Earth geographic data in the public domain).
