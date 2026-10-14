# Model and evidence boundary


| Existing local module | Role observed in source |
| --- | --- |
| 02-context-engine.js | Context search, topic inference and event relevance |
| 03-map-core.js | World map and geographic layer loading |
| 12-stock-data.js | Stock metadata and deterministic synthetic price/capital-flow series |
| 15-portfolio-lens.js | Exposure relevance and illustrative dollar-impact transformation |
| 16-decision-engine.js | Multi-event aggregation and opposing-effect detection |
| 18-dsa-bridge.js | Optional local-backend API interface; a source interface alone does not prove a backend is available |


## Public arithmetic

For each sample basket, the score is the sum of `exposure_weight[category] × manually_defined_event_shock × scenario_multiplier`. Duplicate event IDs count once. Opposing positive and negative contributions are flagged. Filtering changes the active sample inputs. No probabilities are estimated.

Weights, shocks and locations are artificial examples. A map marker does not assert that an event happened at that location. The model has no causal calibration, empirical return estimate or trading action.

## Validation and open work


