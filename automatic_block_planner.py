from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Dict, Iterable, List, Sequence, Tuple


@dataclass(frozen=True)
class MaintenanceTask:
    task_id: str
    source_system: str
    department: str
    corridor_id: str
    asset_id: str
    due_date: date
    estimated_block_minutes: int
    criticality: int
    defect_severity: int
    asset_impact: int
    overdue_days: int = 0


@dataclass
class CorridorSlot:
    slot_id: str
    corridor_id: str
    block_date: date
    available_minutes: int
    passenger_train_load: int
    goods_train_load: int
    remaining_minutes: int = field(init=False)

    def __post_init__(self) -> None:
        self.remaining_minutes = self.available_minutes


@dataclass(frozen=True)
class BlockAssignment:
    task_id: str
    slot_id: str
    corridor_id: str
    block_date: date
    department: str
    priority_score: float


@dataclass(frozen=True)
class PlanningResult:
    horizon: str
    assignments: List[BlockAssignment]
    unscheduled_task_ids: List[str]


def _normalize_task(raw_task: Dict[str, object], source_system: str, department: str, reference_date: date) -> MaintenanceTask:
    due_date = raw_task["due_date"]
    if not isinstance(due_date, date):
        raise TypeError("due_date must be a datetime.date")

    overdue_days = max((reference_date - due_date).days, 0)
    return MaintenanceTask(
        task_id=str(raw_task["task_id"]),
        source_system=source_system,
        department=department,
        corridor_id=str(raw_task["corridor_id"]),
        asset_id=str(raw_task["asset_id"]),
        due_date=due_date,
        estimated_block_minutes=int(raw_task.get("estimated_block_minutes", 60)),
        criticality=int(raw_task.get("criticality", 1)),
        defect_severity=int(raw_task.get("defect_severity", 1)),
        asset_impact=int(raw_task.get("asset_impact", 1)),
        overdue_days=overdue_days,
    )


def integrate_maintenance_data(
    tms_tasks: Sequence[Dict[str, object]],
    smms_tasks: Sequence[Dict[str, object]],
    tdms_tasks: Sequence[Dict[str, object]],
    reference_date: date,
) -> List[MaintenanceTask]:
    integrated: List[MaintenanceTask] = []
    for source_tasks, source_name, dept in (
        (tms_tasks, "TMS", "Engineering"),
        (smms_tasks, "SMMS", "Signal & Telecommunication"),
        (tdms_tasks, "TDMS", "Traction Distribution"),
    ):
        integrated.extend(
            _normalize_task(task, source_system=source_name, department=dept, reference_date=reference_date)
            for task in source_tasks
        )
    return integrated


def score_task_priority(task: MaintenanceTask) -> float:
    # Weighted risk score (ML-model-ready feature blend) for urgency and asset impact.
    return (
        (task.criticality * 0.35)
        + (task.defect_severity * 0.25)
        + (task.asset_impact * 0.20)
        + (min(task.overdue_days, 30) * 0.20)
    )


def _horizon_end(reference_date: date, horizon: str) -> date:
    if horizon == "weekly":
        return reference_date + timedelta(days=7)
    if horizon == "monthly":
        return reference_date + timedelta(days=31)
    raise ValueError("horizon must be either 'weekly' or 'monthly'")


def _slot_disruption_score(slot: CorridorSlot) -> int:
    return (slot.passenger_train_load * 2) + slot.goods_train_load


def generate_block_plan(
    tasks: Sequence[MaintenanceTask],
    slots: Sequence[CorridorSlot],
    reference_date: date,
    horizon: str,
) -> PlanningResult:
    end_date = _horizon_end(reference_date, horizon)

    eligible_tasks = [
        task
        for task in tasks
        if task.due_date <= end_date or task.overdue_days > 0
    ]
    prioritized_tasks = sorted(eligible_tasks, key=score_task_priority, reverse=True)

    slot_pool = [
        slot
        for slot in slots
        if reference_date <= slot.block_date <= end_date
    ]
    slot_pool.sort(key=lambda s: (s.block_date, _slot_disruption_score(s)))

    assignments: List[BlockAssignment] = []
    unscheduled: List[str] = []

    for task in prioritized_tasks:
        task_score = score_task_priority(task)
        valid_slots = [
            slot
            for slot in slot_pool
            if slot.corridor_id == task.corridor_id and slot.remaining_minutes >= task.estimated_block_minutes
        ]

        if not valid_slots:
            unscheduled.append(task.task_id)
            continue

        chosen_slot = min(
            valid_slots,
            key=lambda slot: (
                _slot_disruption_score(slot),
                slot.block_date,
                -sum(1 for assignment in assignments if assignment.slot_id == slot.slot_id and assignment.department != task.department),
            ),
        )
        chosen_slot.remaining_minutes -= task.estimated_block_minutes
        assignments.append(
            BlockAssignment(
                task_id=task.task_id,
                slot_id=chosen_slot.slot_id,
                corridor_id=task.corridor_id,
                block_date=chosen_slot.block_date,
                department=task.department,
                priority_score=round(task_score, 2),
            )
        )

    return PlanningResult(horizon=horizon, assignments=assignments, unscheduled_task_ids=unscheduled)


def generate_weekly_and_monthly_plans(
    tasks: Sequence[MaintenanceTask],
    slots: Sequence[CorridorSlot],
    reference_date: date,
) -> Dict[str, PlanningResult]:
    return {
        "weekly": generate_block_plan(tasks, slots, reference_date, "weekly"),
        "monthly": generate_block_plan(tasks, slots, reference_date, "monthly"),
    }
