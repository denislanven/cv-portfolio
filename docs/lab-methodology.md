# HR Lab: models, data and limits

Version: 28 October 2026. All numerical examples and training scenarios are synthetic. They are not employer data, salary benchmarks or validated psychological assessments.

## People Economics

A conditional cost scenario, not an attrition forecast. Replacement cost is the sum of user-entered recruiting, onboarding, participant time and other vacancy costs. Components must not overlap. Gross avoided cost equals the assumed number of avoided departures multiplied by replacement cost. Net effect subtracts programme cost. Breakeven rounds the ratio of programme cost to replacement cost up to a whole departure. ROI is undefined for a zero programme budget; breakeven is undefined when replacement cost is zero. Resource savings do not necessarily create cash savings.

The separate pilot builder totals illustrative initiative costs against a budget. It does not assign an automatic uplift in eNPS, a reduction in turnover or a burnout score.

## Capacity Lab

One quarter is modelled as 13 weeks / three months. Demand and capacity are evaluated separately by role. Spare capacity in one role does not offset another role's deficit. New hires add capacity only after their assumed start date, scaled by a user-entered ramp-up percentage. Salary cost follows the active period, not productive capacity. Contractor hours, contractor rate multiplier and process-change costs are explicit inputs. Recruitment costs, severance, skill differences and task dependencies are not modelled.

## Rewards Lab

Monthly total cost = salaries × (1 + bonus reserve) × (1 + overhead rate). Base and scenario use the same expense assumptions. Incremental annual cost uses the number of calendar months remaining from the effective month. New positions start in that month. Compa-ratio uses the midpoint of the editable salary range. Initial ranges are synthetic, not market evidence. Salary position is not a performance assessment or an automatic reason for a raise. This is not a tax calculator.

## Team Signals

Quarterly turnover = departures / average headcount for that quarter. The departure population must be defined consistently. The response rate uses invitations on the survey date, not average quarterly headcount. No invitations means no response-rate estimate; no responses means no average score. A 1–5 pulse is not eNPS. Static exit-interview notes are marked as a separate fictional example. Actions total cost, ownership, timing and checks; they do not predict avoided resignations.

## Decision Room

Four author-written decisions in a fictional business. The cost-saving strategy changes the next case. Financial amounts are scenario conditions. The final output records arguments, uncertainties and commitments; it is not a competence score or a forecast. Unverified savings and transition costs remain unverified.

## PulseLink

A local workflow prototype. It sends no Telegram or Slack messages, creates no requests or events, and calls no HRIS APIs. The architecture is a proposed implementation. Individual attrition probabilities, burnout indices and simulated successful API responses are absent. Access policies, error handling, retention and small-group disclosure risks would need resolution before a real deployment.

## Pepe / Onboarding Lab

Role-specific 30–60–90 plans and five author-written workplace situations. Answers produce a discussion sheet, not a psychological profile, an attrition risk or a pass/fail judgment. Real objectives and timing need agreement with the employee and manager.

## Release Room

A fictional pixel-art team game. Rank and energy are gameplay mechanics. The debrief turns observations into one process agreement, an owner and a review date. It must not be used to identify or assess actual colleagues.

## Evidence and evaluation

CIPD's people analytics guidance distinguishes correlation, causation and prediction: https://www.cipd.org/uk/knowledge/factsheets/analytics-factsheet/

The reference informs interpretation, not the illustrative numerical assumptions above. Claims that an intervention caused an outcome require a suitable evaluation design, baseline measurements and attention to alternatives such as changing team composition and seasonality.

## Verification

Run `node --test tests/*.test.cjs` from the repository root. Calculation tests cover reconciliation and edge cases. The offline DOM fixture exercises application startup, translations and interactions without a browser or network. It does not verify visual layout, native browser behavior or accessibility implementation in a real browser.
