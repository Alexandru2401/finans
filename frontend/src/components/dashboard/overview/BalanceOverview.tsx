import { useEffect, useState } from "react";
import { getBudgetSummary, type BudgetSummary } from "@/api/budget";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import CardError from "@/components/dashboard/shared/CardError";
import { periodLabel as getPeriodLabel } from "@/lib/periods";
import { Pie, PieChart } from "recharts";

interface Props {
  period: string;
}

const chartConfig = {
  income: { label: "Income", color: "var(--chart-2)" },
  spendings: { label: "Spendings", color: "var(--chart-5)" },
  savings: { label: "Savings", color: "var(--chart-1)" },
} satisfies ChartConfig;

function BalanceCardHeader({ periodLabel }: { periodLabel: string }) {
  return (
    <CardHeader>
      <CardTitle className="text-base">Balance breakdown</CardTitle>
      <CardDescription className="text-muted-foreground">
        Income, spendings and savings · {periodLabel}
      </CardDescription>
    </CardHeader>
  );
}

export default function BalanceOverview({ period }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{
    key: string;
    summary: BudgetSummary | null;
  } | null>(null);
  // Changes on every new request; results from older requests are ignored
  const key = `${period}-${attempt}`;

  useEffect(() => {
    let cancelled = false;
    getBudgetSummary(period)
      .then((res) => res.data)
      .catch(() => null)
      .then((data) => !cancelled && setResult({ key, summary: data }));
    return () => {
      cancelled = true;
    };
  }, [key, period]);

  const loading = result?.key !== key;
  const summary = loading ? null : (result?.summary ?? null);
  const error = !loading && !summary;
  const onRetry = () => setAttempt((n) => n + 1);
  const periodLabel = getPeriodLabel(period);

  if (!loading && error) {
    return (
      <Card className="flex flex-col">
        <BalanceCardHeader periodLabel={periodLabel} />
        <CardError message="Could not load the breakdown." onRetry={onRetry} />
      </Card>
    );
  }

  if (loading || !summary) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 h-3 w-40" />
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center pb-0">
          <Skeleton className="mx-auto aspect-square max-h-62.5 w-full rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (summary.income === 0 && summary.expense === 0 && summary.savings === 0) {
    return (
      <Card className="flex flex-col">
        <BalanceCardHeader periodLabel={periodLabel} />
        <CardContent className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No transactions recorded for this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    {
      budgetType: "income",
      money: summary.income,
      fill: "var(--chart-2)",
    },
    {
      budgetType: "spendings",
      money: summary.expense,
      fill: "var(--chart-5)",
    },
    {
      budgetType: "savings",
      money: summary.savings,
      fill: "var(--chart-1)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <BalanceCardHeader periodLabel={periodLabel} />
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
          role="img"
          aria-label="Breakdown of income, spendings and savings"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="money" nameKey="budgetType" />
            <ChartLegend
              content={<ChartLegendContent nameKey="budgetType" />}
              className="flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
