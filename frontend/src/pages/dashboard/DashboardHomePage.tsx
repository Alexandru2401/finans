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
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { PERIODS, type Period } from "@/lib/periods";

export default function DashboardHomePage() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<Period>("last-month");

  const user = useAuth().user;

  return (
    <section className="px-4 py-4 max-w-7xl mx-auto">
      <PageHeader
        title={t("dashboard.overview.welcome", {
          name: user?.username || t("dashboard.overview.defaultUser"),
        })}
        subtitle={t("dashboard.overview.subtitle")}
      >
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger
            className="w-40"
            aria-label={t("dashboard.overview.selectPeriod")}
          >
            <SelectValue placeholder={t("dashboard.periods.last-month")} />
          </SelectTrigger>
          <SelectContent>
            {PERIODS.map((p) => (
              <SelectItem key={p} value={p}>
                {t(`dashboard.periods.${p}`)}
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
