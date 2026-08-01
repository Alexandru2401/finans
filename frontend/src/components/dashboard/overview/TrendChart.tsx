import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

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

const spendingTrend = [
  { month: "Jan", income: 5200, expenses: 2800, savings: 1200 },
  { month: "Feb", income: 4800, expenses: 3100, savings: 900 },
  { month: "Mar", income: 5500, expenses: 2600, savings: 1500 },
  { month: "Apr", income: 6000, expenses: 3400, savings: 1800 },
  { month: "May", income: 5100, expenses: 2900, savings: 1100 },
  { month: "Jun", income: 5800, expenses: 3200, savings: 1400 },
];

export default function SpendingTrendingChart() {
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
                <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--finance-primary)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--finance-primary)"
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
              <Area
                type="monotone"
                dataKey="savings"
                stroke="var(--finance-primary)"
                strokeWidth={2}
                fill="url(#savings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
