import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BudgetSummary } from "@/api/budget";

interface Props {
  summary: BudgetSummary | null;
  loading: boolean;
}

const chartConfig = {
  income: { label: "Income", color: "var(--chart-2)" },
  spendings: { label: "Spendings", color: "var(--chart-5)" },
  savings: { label: "Savings", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function BalanceOverview({ summary, loading }: Props) {
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
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </CardFooter>
      </Card>
    );
  }

  const savingsRate =
    summary.income > 0 ? Math.round((summary.net / summary.income) * 100) : 0;

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
      <CardHeader>
        <CardTitle className="text-base">Balance breakdown</CardTitle>
        <CardDescription className="text-muted-foreground">
          Income, spendings and savings
        </CardDescription>
      </CardHeader>
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
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <p className="flex items-center gap-1 font-medium">
          Net margin {savingsRate}%
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
        </p>
        <p className="text-muted-foreground">
          Total net balance: ${summary.net.toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
}
