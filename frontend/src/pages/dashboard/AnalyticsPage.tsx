import { TrendingUp, Info, Pin, AlertTriangle, Repeat } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";
import { CartesianGrid, Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

import AnalyticsRightColumn from "./AnalyticsRightColumn";

const chartData = [
  { month: "January", income: 186, expenses: 80, savings: 106 },
  { month: "February", income: 305, expenses: 200, savings: 105 },
  { month: "March", income: 237, expenses: 120, savings: 117 },
  { month: "April", income: 73, expenses: 190, savings: -117 },
  { month: "May", income: 209, expenses: 130, savings: 79 },
  { month: "June", income: 214, expenses: 140, savings: 74 },
];

const barChartConfig = {
  income: { label: "Income", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  savings: { label: "Savings", color: "var(--chart-3)" },
} satisfies ChartConfig;

const expensesConfig = {
  expenses: { label: "Expenses", color: "var(--chart-2)" },
} satisfies ChartConfig;

const savingsConfig = {
  savings: { label: "Savings", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track income, expenses, savings and add new budget items quickly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart — toate 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Income, Expenses & Savings</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={4}
                />
                <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing totals for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Line Chart — doar expenses */}
        <div>
          <div className="space-y-4 mb-2">
            {/* Insight banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl">
              <Info size={16} className="shrink-0 mt-0.5 text-blue-500" />
              <p className="text-sm leading-relaxed">
                Analizând cheltuielile din ultimele 6 luni, se pare că în
                următoarele 6 luni cheltuielile vor crește cu aproximativ{" "}
                <span className="font-semibold">15% pe lună</span>.
              </p>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cheltuieli fixe */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted">
                    <Pin size={14} className="text-muted-foreground" />
                  </span>
                  <h3 className="text-sm font-semibold text-card-foreground">
                    Cheltuieli fixe lunare
                  </h3>
                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Recurente
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { label: "Chirie", amount: 1200, pct: 75 },
                    { label: "Utilități", amount: 300, pct: 19 },
                    { label: "Internet", amount: 60, pct: 4 },
                  ].map(({ label, amount, pct }) => (
                    <li key={label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-card-foreground">
                          ${amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-1.5 rounded-full bg-blue-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground border-t border-border pt-3">
                  Total fix lunar:{" "}
                  <span className="font-semibold text-card-foreground">
                    $1,560
                  </span>
                </p>
              </div>

              {/* Cheltuieli variabile */}
              <div className="rounded-xl border border-orange-200 bg-orange-50/60 dark:bg-orange-950/20 dark:border-orange-900 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                    <AlertTriangle size={14} className="text-orange-500" />
                  </span>
                  <h3 className="text-sm font-semibold text-card-foreground">
                    Cheltuieli variabile mari
                  </h3>
                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
                    Optimizabile
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { label: "Restaurante", amount: 1200, pct: 75 },
                    { label: "Shopping", amount: 300, pct: 19 },
                    { label: "Concert", amount: 60, pct: 4 },
                  ].map(({ label, amount, pct }) => (
                    <li key={label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-card-foreground">
                          ${amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-orange-100 dark:bg-orange-900/30">
                        <div
                          className="h-1.5 rounded-full bg-orange-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground border-t border-orange-200 dark:border-orange-900 pt-3">
                  Total variabil:{" "}
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    $1,560
                  </span>{" "}
                  — potențial de reducere
                </p>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Cheltuieli viitoare</CardTitle>
              <CardDescription>Iunie - Decembrie 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={expensesConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 8, left: 8, right: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="expenses"
                    type="monotone"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-expenses)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                April peak — highest expenses this period{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Monthly expenses for the next 6 months
              </div>
            </CardFooter>
          </Card>
        </div>

        <AnalyticsRightColumn />
      </div>
    </section>
  );
}
