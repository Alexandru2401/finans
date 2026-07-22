import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Link } from "react-router";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
export const description = "A simple pie chart";

const chartData = [
  { budgetType: "income", money: 275, fill: "#059669" },
  { budgetType: "spendings", money: 200, fill: "#dc2626" },
  { budgetType: "savings", money: 187, fill: "#3874FF" },
];

const chartConfig = {
  money: { label: "Money" },
  income: { label: "Income", color: "#059669" },
  spendings: { label: "Spendings", color: "#dc2626" },
  savings: { label: "Savings", color: "#7c3aed" },
} satisfies ChartConfig;

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

// culori pentru barele de categorie — doar stilizare
const CATEGORY_BAR_COLORS = [
  "[&>*]:bg-violet-500",
  "[&>*]:bg-sky-500",
  "[&>*]:bg-amber-500",
  "[&>*]:bg-teal-500",
  "[&>*]:bg-slate-400",
];

export default function DashboardHomePage() {
  const spendingByCategory = [
    { category: "Insurance", amount: 5200, percentage: 65 },
    { category: "Food & Dining", amount: 550, percentage: 7 },
    { category: "Shopping", amount: 450, percentage: 6 },
    { category: "Utilities", amount: 150, percentage: 2 },
    { category: "Other", amount: 1450, percentage: 20 },
  ];


  return (
    <section className="px-4 max-w-8xl mx-auto">
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
            <SelectTrigger className="w-[160px]" aria-label="Select period">
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
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardDescription>Total net balance</CardDescription>
            <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
              $5,200
            </CardTitle>
            <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              3.5% vs last month
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                <p className="text-sm text-muted-foreground">Total income</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                  $5,200
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  3.5% vs last month
                </p>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50/60 p-4 dark:border-red-900 dark:bg-red-950/30">
                <p className="text-sm text-muted-foreground">Total spendings</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-red-700 dark:text-red-400">
                  $5,200
                </p>
                {/* crestere la cheltuieli = semnal negativ */}
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  3.5% vs last month
                </p>
              </div>

              <div className="rounded-lg border border-[#3874FF]/50 bg-[#3874FF]/20 p-4 dark:border-[#3874FF] dark:bg-violet-950/30">
                <p className="text-sm text-muted-foreground">Total savings</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-[#3874FF] dark:text-violet-400">
                  $5,200
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                  3.5% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts row */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">Balance breakdown</CardTitle>
              <CardDescription>Income, spendings and savings</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
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
                Trending up by 5.2% this month
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </p>
              <p className="text-muted-foreground">Total net balance: $2,500</p>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    Spendings Overview
                  </CardTitle>
                  <CardDescription>Your expenses this period</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="transactions">See all</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950">
                <TrendingUp
                  className="h-5 w-5 shrink-0 text-orange-500"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium text-orange-700 dark:text-orange-400">
                  12% increase from last month
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold">Spending by Category</p>
                {spendingByCategory.map((item, i) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.category}
                      </span>
                      <span className="font-medium tabular-nums">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={item.percentage}
                      className={`h-1.5 ${CATEGORY_BAR_COLORS[i % CATEGORY_BAR_COLORS.length]}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trend + Recent transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">Spending Trend</CardTitle>
                <CardDescription>
                  Income vs Expenses — last 6 months
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="statistics">See details</Link>
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
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                  />
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
                    stroke="#059669"
                    strokeWidth={2}
                    fill="url(#income)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#dc2626"
                    strokeWidth={2}
                    fill="url(#expenses)"
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    fill="url(#savings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial transactions.
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="transactions">See all</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[140px]">Description</TableHead>
                    <TableHead className="min-w-[100px]">Category</TableHead>
                    <TableHead className="min-w-[90px]">Date</TableHead>
                    <TableHead className="min-w-[100px] text-right">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Stripe Payment</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        Sales
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      Jan 24
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                      +$1,250
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Office Rent</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                        Rent
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      Jan 23
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-red-700 dark:text-red-400">
                      -$2,000
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Software Tools</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                        SaaS
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      Jan 22
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-red-700 dark:text-red-400">
                      -$320
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Client Invoice</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        Sales
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      Jan 21
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                      +$4,500
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Stripe Payment</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        Sales
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      Jan 24
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                      +$1,250
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}