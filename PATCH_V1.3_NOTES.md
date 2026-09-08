# SAPE Patch V1.3 — Report Functional Completion

## Fixed reports
1. Yield
2. Demand-Supply
3. Allocation

## Preventive fixes
- Stock at Risk
- Forecast Accuracy
- Variance
- Universal report fallback states

## Business flow used by connected mock data
Chicken Intake Plan → Yield → Available Supply → Demand-Supply Balance → Sales Allocation → Confirmed SO → Delivery

## Chicken Intake logic
The application uses the confirmed chicken intake plan sent by farms directly. It does not calculate from farm placement or mortality in the report flow.

Planned Live KG = Planned Chicken Qty × Average Weight KG/Bird
