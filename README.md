# YANTRANA-AI-Powered-Automatic-Block-Planning-System

AI-powered automatic block planning to maximize asset availability for train operations on Indian Railways.

## What is implemented

This repository now includes a minimal **Automatic Block Planning engine** in `automatic_block_planner.py` that:

1. Integrates maintenance/defect inputs from TMS, SMMS, and TDMS.
2. Scores and prioritizes tasks using a weighted AI-style risk score (criticality, defect severity, asset impact, overdue days).
3. Optimizes block assignment against corridor slot availability while minimizing train disruption (passenger + goods load aware).
4. Generates plans for **weekly** and **monthly** horizons.

## Data model

- `MaintenanceTask`: unified task object from departmental systems.
- `CorridorSlot`: available block/disconnection window with train-load context.
- `PlanningResult`: assignments and unscheduled tasks for each horizon.

## Quick usage

```python
from datetime import date
from automatic_block_planner import integrate_maintenance_data, CorridorSlot, generate_weekly_and_monthly_plans

reference_date = date.today()

tasks = integrate_maintenance_data(tms_tasks=[...], smms_tasks=[...], tdms_tasks=[...], reference_date=reference_date)
slots = [CorridorSlot(slot_id="S1", corridor_id="C1", block_date=reference_date, available_minutes=120, passenger_train_load=5, goods_train_load=3)]

plans = generate_weekly_and_monthly_plans(tasks, slots, reference_date)
print(plans["weekly"].assignments)
print(plans["monthly"].assignments)
```

## Tests

Run:

```bash
python -m unittest -v
```
