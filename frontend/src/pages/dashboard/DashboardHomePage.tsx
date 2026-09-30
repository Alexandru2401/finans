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

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PERIOD_OPTIONS } from "@/lib/periods";

export default function DashboardHomePage() {
  const [period, setPeriod] = useState("last-month");

  const user = useAuth().user;

  return (
    <section className="px-4 py-4 max-w-7xl mx-auto">
      <PageHeader
        title={`Welcome back, ${user?.username || "User"}!`}
        subtitle=" Take a look over your financial dashboard."
      >
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40" aria-label="Select period">
            <SelectValue placeholder="Last month" />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <NetBalance period={period} />
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceOverview period={period} />
          <SpendingOverview period={period} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingTrendingChart period={period} />
        <OverviewTable />
      </div>
    </section>
  );
}
