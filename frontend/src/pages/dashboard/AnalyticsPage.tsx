import AnalyticsChart from "@/components/dashboard/analytics/AnalyticsCharts";
import ExpensesInfo from "@/components/dashboard/analytics/ExpensesInfo";
import type {
  BudgetItem,
  NewBudgetItem,
} from "@/store/dashboardStore/BudgetStoreContext";
import AnalyticsInsight from "@/components/dashboard/analytics/AnalyticsInsight";
import {
  ChevronDown,
  SlidersHorizontal
} from "lucide-react";

export interface Section {
  title: string;
  items: BudgetItem[];
  total: number;
  section: "income" | "expenses" | "savings";
  onDelete: (id: string) => void;
  onEdit: (id: string, payload: Partial<NewBudgetItem>) => void;
}


import BudgetHealth from "@/components/dashboard/analytics/BudgetHealth";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spending patterns, trends and forecasts.
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer gap-2"
            data-active="true"
          // onClick={() => setOpenFilters((prev) => !prev)}
          >
            <SlidersHorizontal size={16} />
            Filters
            <ChevronDown size={14} className="opacity-60" />
          </Button>
        </div>
      </div>

      {/* ===== RAND 1: insight ===== */}
      <div className="mb-6 grid items-start gap-6 lg:grid-cols-2">
        <AnalyticsInsight />

        <BudgetHealth />
      </div>

      {/* ===== RAND 2: grafice ===== */}
      <AnalyticsChart />

      {/* ===== RAND 3: breakdown ===== */}
      <ExpensesInfo />

    </section >
  );
}
