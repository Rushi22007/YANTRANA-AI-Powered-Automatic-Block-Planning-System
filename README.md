# YANTRANA – AI-Powered Automatic Railway Block Planning System

## Overview

YANTRANA is a prototype decision-support system for railway maintenance block planning. It combines maintenance jobs, assets, equipment availability, train movements, corridor availability, block requests, and historical blocks to help identify suitable maintenance windows and highlight planning conflicts.

The prototype provides a centralized dashboard for reviewing maintenance priorities, corridor activity, train occupancy, block requests, feasibility checks, and historical performance. It uses local CSV data and is not connected to live Indian Railways operational APIs.

## Problem Statement

Railway maintenance activities require safe and practical time windows in which work can be performed without creating unacceptable operational conflicts. Planning is complicated because:

- Maintenance activities need safe time windows.
- Train movements can conflict with maintenance work.
- Equipment availability affects whether work can be scheduled.
- Multiple departments compete for available blocks.
- Manual planning can be time-consuming and difficult to coordinate.

## Prototype Objective

YANTRANA aims to:

- Prioritize maintenance work.
- Identify available maintenance windows.
- Detect conflicts between proposed work and operational constraints.
- Recommend suitable maintenance blocks.
- Visualize corridor, train, and block information.
- Provide a centralized planning dashboard.

## Key Features

- Executive Dashboard
- Maintenance Jobs
- Asset Health
- Equipment Availability
- AI Priority Engine
- Block Planner
- Conflict Management
- Block Requests
- Block Schedule
- Historical Blocks
- Train Overview
- Train Movements
- Reports & Analytics
- Interactive GIS Corridor Map
- CSV-based local dataset integration
- Maintenance recommendation workflow
- Conflict checks
- Train movement visualization
- Corridor and station visualization

## Data Sources

The current prototype uses eight local CSV datasets. These are demonstration/planning records loaded from the repository, not live railway feeds.

| Dataset | Represents |
| --- | --- |
| `assets.csv` | Railway assets, condition, criticality, age, maintenance dates, failure history, and operational status. |
| `equipment_availability.csv` | Equipment availability by section, date, time window, quantity, and status. |
| `trains.csv` | Train master data, including type, origin, destination, direction, priority class, and running days. |
| `historical_blocks.csv` | Historical maintenance blocks, durations, jobs, affected trains, delays, utilization, and completion status. |
| `corridor_availability.csv` | Corridor section availability, time windows, availability status, train density, and whether maintenance is allowed. |
| `block_requests.csv` | Requested maintenance blocks, requested windows, departments, priorities, crews, equipment, dependencies, and request status. |
| `maintenance_jobs (1).csv` | Maintenance work orders, assets, defects, work types, priorities, durations, crews, equipment, and maintenance status. |
| `train_movements.csv` | Train occupancy movements by section, travel date, entry/exit time, direction, track, duration, and status. |

> **Important:** The application uses **LOCAL CSV DATA** and is not connected to live Indian Railways operational APIs.

## System Architecture

```text
8 CSV Datasets
        ↓
CSV Data Adapter / Normalization
        ↓
Unified Dataset
        ↓
Calculations / Scoring / Conflict Detection
        ↓
Dashboard + AI Priority Engine + Block Planner
        ↓
Maintenance Recommendation + GIS Visualization
```

## AI / Decision Support

The current implementation uses a transparent, rule-based weighted prototype score. It does **not** use a trained machine-learning model and does not connect to a live railway system.

For maintenance priority, the scoring logic combines:

- Declared job priority
- Asset criticality
- Asset condition, with poorer condition increasing urgency
- Overdue or upcoming maintenance due date
- Failure history
- Train movement impact around the preferred window
- Equipment readiness
- Corridor readiness

The priority factors are weighted into a score from 0 to 100 and classified as `CRITICAL`, `HIGH`, `MEDIUM`, or `LOW`. The Block Planner evaluates candidate corridor windows using the requested job duration and feasibility checks. It considers corridor availability, maintenance permission, overlapping train movements, other block requests, and equipment availability, then returns a recommendation, conflict status, affected trains, and supporting checks.

The dashboard also calculates a transparent composite optimization indicator from asset availability, schedulable block-request coverage, historical completion, and historical block utilization. These outputs are decision-support indicators for the prototype, not operational instructions.

## GIS Corridor Map

The corridor view uses **Leaflet** and **OpenStreetMap** tiles to provide an interactive visualization of the demonstration Mumbai-Lonavala railway corridor. It includes:

- Railway corridor sections
- Station markers
- Planned maintenance blocks
- Train paths and movements
- Conflict markers
- Interactive popups with dataset details
- A map legend and corridor/global filters

The source CSV schemas do not contain latitude/longitude fields. For that reason, the map uses a separated static corridor-coordinate configuration in `components/corridor-map/corridor-config.ts` for presentation only. The coordinates define the demonstration corridor and are not geographic coordinates supplied by the CSV records.

## Technology Stack

The current project uses:

- Next.js 16
- React 19
- TypeScript
- Node.js
- Tailwind CSS tooling through Tailwind CSS and `@tailwindcss/postcss`
- Leaflet
- React Leaflet
- OpenStreetMap tile data
- Recharts
- Lucide React
- npm-compatible package scripts

## Project Structure

```text
app/
  Application routes and page entry points for the dashboard, planning views,
  maintenance views, trains, reports, settings, and corridor map.
components/
  Dashboard, page, chart, shell, corridor-map, shared, and UI components.
lib/
  Shared application logic, filters, utilities, and calculations.
lib/data/
  CSV files, schemas, metadata, data adapter, and dataset context.
lib/calculations/
  Asset, availability, block-performance, and related calculations.
lib/conflict/
  Feasibility checks and conflict detection for maintenance windows.
lib/scoring/
  Transparent priority, block recommendation, and optimization scoring.
```

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL printed by Next.js, typically `http://localhost:3000`.

Run the production build validation:

```bash
npm run build
```

## Data Setup

The eight CSV files are expected in the current project at:

```text
lib/data/
```

The CSV adapter in `lib/data/csv.ts` reads the files synchronously from that directory using the project working directory as its base path. It parses and normalizes dates, times, numeric values, boolean flags, section identifiers, priorities, and statuses into the unified dataset consumed by the dashboard and planning logic.

The current repository filename for the maintenance jobs dataset is `maintenance_jobs (1).csv`, and the adapter loads that exact filename. If the file is renamed, the adapter must be updated accordingly. The other seven files use the names shown in the data-source table above.

## Prototype Limitations

- Uses local CSV datasets.
- Is not connected to live railway systems or live Indian Railways operational APIs.
- Uses static prototype GIS coordinates because the source CSV files do not contain geographic coordinates.
- Provides decision-support/prototype logic rather than an operational railway instruction.
- Does not currently include authentication, OTP, or live railway API integration.
- The AI Priority Engine is a transparent weighted scoring and recommendation workflow, not a trained AI/ML model.

## FUTURE SCOPE

The following are possible future enhancements and are **not implemented features of the current prototype**:

- Live railway data/API integration
- Real GIS railway network integration
- User authentication and role-based access
- OTP and work-authorization workflow
- Real-time train tracking
- Advanced optimization algorithms
- Predictive maintenance
- Notifications and alerts
- Database integration
- Audit trail
- Production deployment

## Disclaimer

> This is a prototype decision-support system and is not intended for direct operational railway control or safety-critical decision making.

## License

License: Not specified yet.