from datetime import date, timedelta
import unittest

from automatic_block_planner import (
    CorridorSlot,
    generate_weekly_and_monthly_plans,
    integrate_maintenance_data,
)


class AutomaticBlockPlannerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.reference_date = date(2026, 9, 1)

    def test_integration_maps_source_system_and_department(self) -> None:
        tasks = integrate_maintenance_data(
            tms_tasks=[{
                "task_id": "T-1",
                "corridor_id": "C1",
                "asset_id": "A1",
                "due_date": self.reference_date,
                "criticality": 5,
                "defect_severity": 4,
                "asset_impact": 4,
            }],
            smms_tasks=[],
            tdms_tasks=[],
            reference_date=self.reference_date,
        )
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0].source_system, "TMS")
        self.assertEqual(tasks[0].department, "Engineering")

    def test_scheduler_prioritizes_critical_and_overdue_work(self) -> None:
        tasks = integrate_maintenance_data(
            tms_tasks=[{
                "task_id": "ENG-LOW",
                "corridor_id": "C1",
                "asset_id": "A2",
                "due_date": self.reference_date + timedelta(days=1),
                "estimated_block_minutes": 60,
                "criticality": 2,
                "defect_severity": 2,
                "asset_impact": 2,
            }],
            smms_tasks=[{
                "task_id": "SNT-HIGH",
                "corridor_id": "C1",
                "asset_id": "S3",
                "due_date": self.reference_date - timedelta(days=6),
                "estimated_block_minutes": 60,
                "criticality": 5,
                "defect_severity": 5,
                "asset_impact": 5,
            }],
            tdms_tasks=[],
            reference_date=self.reference_date,
        )

        slots = [
            CorridorSlot(
                slot_id="BLK-1",
                corridor_id="C1",
                block_date=self.reference_date + timedelta(days=1),
                available_minutes=60,
                passenger_train_load=8,
                goods_train_load=3,
            )
        ]

        weekly_plan = generate_weekly_and_monthly_plans(tasks, slots, self.reference_date)["weekly"]
        self.assertEqual(len(weekly_plan.assignments), 1)
        self.assertEqual(weekly_plan.assignments[0].task_id, "SNT-HIGH")
        self.assertIn("ENG-LOW", weekly_plan.unscheduled_task_ids)

    def test_monthly_horizon_captures_future_due_tasks(self) -> None:
        tasks = integrate_maintenance_data(
            tms_tasks=[],
            smms_tasks=[],
            tdms_tasks=[{
                "task_id": "TRAC-MONTH",
                "corridor_id": "C9",
                "asset_id": "T1",
                "due_date": self.reference_date + timedelta(days=20),
                "estimated_block_minutes": 90,
                "criticality": 4,
                "defect_severity": 4,
                "asset_impact": 4,
            }],
            reference_date=self.reference_date,
        )
        slots = [
            CorridorSlot(
                slot_id="BLK-WEEK",
                corridor_id="C9",
                block_date=self.reference_date + timedelta(days=5),
                available_minutes=60,
                passenger_train_load=1,
                goods_train_load=1,
            ),
            CorridorSlot(
                slot_id="BLK-MONTH",
                corridor_id="C9",
                block_date=self.reference_date + timedelta(days=25),
                available_minutes=120,
                passenger_train_load=2,
                goods_train_load=2,
            ),
        ]

        plans = generate_weekly_and_monthly_plans(tasks, slots, self.reference_date)
        self.assertEqual(plans["weekly"].assignments, [])
        self.assertEqual(len(plans["monthly"].assignments), 1)
        self.assertEqual(plans["monthly"].assignments[0].slot_id, "BLK-MONTH")


if __name__ == "__main__":
    unittest.main()
