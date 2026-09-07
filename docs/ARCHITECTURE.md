# SAPE V1.1 — Implementation Architecture

## Business flow

Chicken Intake Plan → Live KG → Yield Profile → Product Supply → Demand–Supply Balance → Allocation → Sales Action → CRM → Quotation → Contract → SO Draft → Oracle R12 → Delivery → KPI

## Ownership

| Domain | Source of truth |
|---|---|
| Product, Customer, SO, Actual Sales | Oracle E-Business Suite R12 |
| Stock, Lot, Delivery | ERP / WMS |
| Plan, Yield, Allocation, Sales Action, Quote, Contract, KPI | SAPE |

## Core formulas implemented in Phase 1 UI

- `Live KG = Birds × Average Weight`
- `Expected Supply KG = Source KG × Yield %`
- `Available Supply = Production + Stock + Transfer − Reserved − Safety Stock`
- `Balance = Available Supply − Demand`
- `Allocation Remaining = Available Supply − Sum(Channel Allocation)`
- Submit is blocked when allocation remaining is negative.

## Target production architecture

- Frontend: React + TypeScript + Vite
- Application API: versioned REST endpoints (`/api/v1`)
- Database: PostgreSQL with immutable approved revisions and audit events
- Integration: scheduled/incremental Oracle R12 inbound sync; controlled SO outbound queue with retry and reconciliation
- Security: SSO-ready role-based access; floor price visible only to authorized roles

Phase 1 currently uses typed mock data so users can validate workflow and calculations before database and ERP field mapping are connected.
