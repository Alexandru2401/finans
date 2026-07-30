import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import BalanceOverview from "@/components/dashboard/overview/BalanceOverview";
import NetBalance from "@/components/dashboard/overview/NetBalance";
import OverviewTable from "@/components/dashboard/overview/OverviewTable";
import SpendingOverview from "@/components/dashboard/overview/SpendingOverview";
import SpendingTrendingChart from "@/components/dashboard/overview/TrendChart";

import { useEffect, useState } from "react";
import { getBudgetSummary, type BudgetSummary } from "@/api/budget";

export default function DashboardHomePage() {
  const [period, setPeriod] = useState("last-month");
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBudgetSummary(period)
      .then((res) => res.ok && setSummary(res.data))
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <section className="px-4 max-w-7xl mx-auto">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, User!</h1>
          <p className="text-sm text-muted-foreground mt-1">Take a look over your financial dashboard.</p>
        </div>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40" aria-label="Select period">
            <SelectValue placeholder="Last month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-3">Last 3 months</SelectItem>
            <SelectItem value="last-6">Last 6 months</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <NetBalance summary={summary} loading={loading} />
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceOverview />
          <SpendingOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingTrendingChart />
        <OverviewTable />
      </div>
    </section>
  );
}