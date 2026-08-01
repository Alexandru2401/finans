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
import PageHeader from "@/components/dashboard/shared/PageHeader";

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
    <section className="px-4 py-4 max-w-7xl mx-auto">
      <PageHeader
        title="Welcome back, User!"
        subtitle=" Take a look over your financial dashboard."
      >
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
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <NetBalance summary={summary} loading={loading} />
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceOverview summary={summary} loading={loading} />
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
