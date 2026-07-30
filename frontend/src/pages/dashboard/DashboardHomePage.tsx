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


export default function DashboardHomePage() {
  return (
    <section className="px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, User!</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Take a look over your financial dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de perioada — controleaza toata pagina cand il legi */}
          <Select>
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
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {/* Financial Overview Card */}
        <NetBalance />

        {/* Charts row */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceOverview />
          <SpendingOverview />
        </div>
      </div>

      {/* Trend + Recent transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingTrendingChart />

        <OverviewTable />
      </div>
    </section>
  );
}
