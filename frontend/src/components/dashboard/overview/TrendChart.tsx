import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import type { BudgetTrendPoint } from "@/api/budget";

export const description = "A simple pie chart";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  trend: BudgetTrendPoint[] | null;
  loading: boolean;
}

function formatMonth(month: string) {
  return new Date(`${month}-01`).toLocaleDateString("en-US", {
    month: "short",
  });
}

export default function SpendingTrendingChart({ trend, loading }: Props) {
  if (loading || !trend) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-3 w-44" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <Skeleton className="h-65 w-full" />
        </CardContent>
      </Card>
    );
  }

  const spendingTrend = trend.map((point) => ({
    month: formatMonth(point.month),
    income: point.income,
    expenses: point.expense,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">Budget Trend</CardTitle>
            <CardDescription>
              Income vs Expenses — last 6 months
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="analytics">See details</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div
          role="img"
          aria-label="Area chart of income, expenses and savings over the last 6 months"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={spendingTrend}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--finance-success)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--finance-success)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--finance-danger)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--finance-danger)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--popover)",
                  color: "var(--popover-foreground)",
                  fontSize: "13px",
                }}
              />
              <Legend
                verticalAlign="top"
                height={32}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />

              <Area
                type="monotone"
                dataKey="income"
                stroke="var(--finance-success)"
                strokeWidth={2}
                fill="url(#income)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="var(--finance-danger)"
                strokeWidth={2}
                fill="url(#expenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
