import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BudgetSummary, BudgetTrendPoint } from "@/api/budget";

interface Props {
  summary: BudgetSummary | null;
  loading: boolean;
  trend: BudgetTrendPoint[] | null;
  trendLoading: boolean;
}

const fmt = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString()}`;

const formatMonth = (month: string) =>
  new Date(`${month}-01`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

const TILES = [
  { key: "income", label: "Total income", color: "text-finance-success" },
  { key: "expense", label: "Total spendings", color: "text-finance-danger" },
  { key: "savings", label: "Total savings", color: "text-finance-primary" },
] as const;

function NetBalanceSkeleton() {
  return (
    <CardContent className="grid gap-6 sm:grid-cols-5">
      <div className="sm:col-span-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-2 h-10 w-40" />
        <Skeleton className="mt-2 h-3 w-24" />
        <Skeleton className="mt-4 h-20 w-full" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-accent/50 p-3"
          >
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="mt-2 h-5 w-16" />
          </div>
        ))}
      </div>
    </CardContent>
  );
}

/** Net balance (income - expenses) per month, as a small area line. */
function NetSparkline({
  trend,
  loading,
  positive,
}: {
  trend: BudgetTrendPoint[] | null;
  loading: boolean;
  positive: boolean;
}) {
  if (loading || !trend) return <Skeleton className="mt-4 h-20 w-full" />;
  if (trend.length < 2) return null;

  const data = trend.map((p) => ({
    month: formatMonth(p.month),
    net: p.income - p.expense,
  }));

  const chartConfig = {
    net: {
      label: "Net",
      color: positive ? "var(--finance-success)" : "var(--finance-danger)",
    },
  } satisfies ChartConfig;

  return (
    <div className="mt-4">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-20 w-full"
        role="img"
        aria-label={`Monthly net balance: ${data
          .map((d) => `${d.month} ${fmt(d.net)}`)
          .join(", ")}`}
      >
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
        >
          <defs>
            <linearGradient id="net-sparkline-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-net)"
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor="var(--color-net)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" hide />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <ChartTooltip
            cursor={{ stroke: "var(--border)" }}
            content={
              <ChartTooltipContent
                indicator="line"
                formatter={(value) => (
                  <span className="font-medium tabular-nums">
                    Net {fmt(Number(value))}
                  </span>
                )}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="net"
            stroke="var(--color-net)"
            strokeWidth={2}
            fill="url(#net-sparkline-fill)"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ChartContainer>
      <p className="mt-1 text-xs text-muted-foreground">
        Net balance · last {data.length} months
      </p>
    </div>
  );
}

export default function NetBalance({
  summary,
  loading,
  trend,
  trendLoading,
}: Props) {
  if (loading || !summary) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <NetBalanceSkeleton />
      </Card>
    );
  }

  const positive = summary.net >= 0;
  const TrendIcon = positive ? TrendingUp : TrendingDown;
  const netMargin =
    summary.income > 0 ? Math.round((summary.net / summary.income) * 100) : 0;

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardContent className="grid gap-6 sm:grid-cols-5">
        <div className="min-w-0 sm:col-span-3">
          <CardDescription>Total net balance</CardDescription>
          <p className="mt-1 text-4xl font-bold tabular-nums text-foreground">
            {fmt(summary.net)}
          </p>
          <p
            className={`mt-1 flex items-center gap-1 text-xs ${
              positive ? "text-finance-success" : "text-finance-danger"
            }`}
          >
            <TrendIcon className="h-4 w-4" aria-hidden="true" />
            {netMargin}% net margin
          </p>

          <NetSparkline
            trend={trend}
            loading={trendLoading}
            positive={positive}
          />
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          {TILES.map((tile) => (
            <div
              key={tile.key}
              className="rounded-lg border border-border bg-accent/50 p-3"
            >
              <p className="text-sm">{tile.label}</p>
              <p
                className={`mt-0.5 text-lg font-semibold tabular-nums ${tile.color}`}
              >
                {fmt(summary[tile.key])}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
