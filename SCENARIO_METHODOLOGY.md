# Scenario Methodology

## Public arithmetic

For each basket j and active event i:

`contribution[i,j] = category_weight[j, category[i]] × event_shock[i] × scenario_multiplier`

`score[j] = sum(contribution[i,j])`

Duplicate event IDs count once. A basket is flagged for opposing components when at least one contribution is positive and another is negative. Zero components do not create an opposing-effect flag.

## Explicit hypotheses

| Hypothesis | Multiplier |
|---|---:|
| Base | 1.0 |
| Disruption | 1.6 |
| Recovery | 0.4 |

These multipliers are manual demonstration assumptions, not fitted probabilities or empirical estimates. Category weights are declared in the public fixture source; negative weights allow effects to point in different directions.

## Data and interpretation

All six events and three baskets are synthetic. Example locations are broad geographic context, without a claim that an event happened there. No visitor location or private operational geography is collected. Scores use arbitrary units and do not represent prices, returns, threat levels or recommended actions.

Filtering changes the active input set. Changing a hypothesis scales the contribution components and their aggregate while retaining their signs. Source provenance refers to the explicit fixture, not a live external feed.

## Validation and next work

Seven deterministic checks cover the arithmetic and edge cases. The browser integration checks category filters, selected evidence, scenario scaling and the contribution table. Empirical applications would require sourced event ingestion, provenance/time alignment, calibrated weights, uncertainty modelling and domain-specific evaluation; those capabilities are not asserted here.
