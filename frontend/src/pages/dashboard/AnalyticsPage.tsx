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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ChevronDown,
  Info,
  Pin,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnalyticsRightColumn from "./AnalyticsRightColumn";

type BudgetType = "income" | "expenses" | "savings";
import type {
  BudgetItem,
  NewBudgetItem,
} from "@/store/dashboardStore/BudgetStoreContext";

export interface Section {
  title: string;
  items: BudgetItem[];
  total: number;
  section: "income" | "expenses" | "savings";
  onDelete: (id: string) => void;
  onEdit: (id: string, payload: Partial<NewBudgetItem>) => void;
}

const CATEGORIES_BY_TYPE: Record<
  BudgetType,
  { value: string; label: string }[]
> = {
  income: [
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "investments", label: "Investments" },
    { value: "bonus", label: "Bonus" },
    { value: "rental", label: "Rental Income" },
    { value: "dividends", label: "Dividends" },
    { value: "other", label: "Other" },
  ],
  expenses: [
    { value: "groceries", label: "Groceries" },
    { value: "rent", label: "Rent / Mortgage" },
    { value: "utilities", label: "Utilities" },
    { value: "transport", label: "Transport" },
    { value: "healthcare", label: "Healthcare" },
    { value: "entertainment", label: "Entertainment" },
    { value: "invoice", label: "Invoice" },
    { value: "subscriptions", label: "Subscriptions" },
    { value: "dining", label: "Dining Out" },
    { value: "other", label: "Other" },
  ],
  savings: [
    { value: "emergency", label: "Emergency Fund" },
    { value: "retirement", label: "Retirement" },
    { value: "vacation", label: "Vacation" },
    { value: "education", label: "Education" },
    { value: "investment", label: "Investment Fund" },
    { value: "house", label: "House / Property" },
    { value: "other", label: "Other" },
  ],
};

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
} satisfies ChartConfig;

const expensesConfig = {
  expenses: { label: "Expenses", color: "var(--chart-2)" },
} satisfies ChartConfig;

const fixedCosts = [
  { label: "Chirie", amount: 1200, pct: 75 },
  { label: "Utilități", amount: 300, pct: 19 },
  { label: "Internet", amount: 60, pct: 4 },
];

const variableCosts = [
  { label: "Restaurante", amount: 1200, pct: 75 },
  { label: "Shopping", amount: 300, pct: 19 },
  { label: "Concert", amount: 60, pct: 4 },
];

export default function AnalyticsPage() {
  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spending patterns, trends and forecasts.
          </p>
        </div>

        {/* Selector de perioada — controleaza toata pagina cand il legi */}
        <Select>
          <SelectTrigger className="w-[170px]" aria-label="Select period">
            <SelectValue placeholder="Last 6 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-3">Last 3 months</SelectItem>
            <SelectItem value="last-6">Last 6 months</SelectItem>
            <SelectItem value="last-12">Last 12 months</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ===== RAND 1: insight ===== */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-blue-500"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed">
          Analizând cheltuielile din ultimele 6 luni, se pare că în următoarele
          6 luni cheltuielile vor crește cu aproximativ{" "}
          <span className="font-semibold">15% pe lună</span>.
        </p>
      </div>

      <Card className="mb-4 border-dashed py-4">
        <CardContent className="px-4">
          <div className="flex flex-wrap items-end gap-3">
            {/* Perioada */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="filter-period"
                className="text-xs text-muted-foreground"
              >
                Period
              </Label>
              <Select>
                <SelectTrigger id="filter-period" className="w-[170px]">
                  <SelectValue placeholder="This month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This month</SelectItem>
                  <SelectItem value="last-month">Last month</SelectItem>
                  <SelectItem value="last-3">Last 3 months</SelectItem>
                  <SelectItem value="last-6">Last 6 months</SelectItem>
                  <SelectItem value="this-year">This year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="custom">Custom range…</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interval custom — vizibil doar cand period === "custom" */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="filter-from"
                className="text-xs text-muted-foreground"
              >
                From
              </Label>
              <Input
                id="filter-from"
                type="date"
                className="w-[150px]"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="filter-to"
                className="text-xs text-muted-foreground"
              >
                To
              </Label>
              <Input
                id="filter-to"
                type="date"
                className="w-[150px]"
                disabled
              />
            </div>

            {/* Categorii — multi-select grupat pe tip */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Categories
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] cursor-pointer justify-between font-normal"
                  >
                    <span className="truncate text-muted-foreground">
                      All categories
                    </span>
                    <ChevronDown size={16} className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[260px] p-0">
                  <div className="border-b p-2">
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <Input
                        placeholder="Search category…"
                        className="h-8 pl-8 text-sm"
                      />
                    </div>
                  </div>

                  <div className="max-h-[280px] overflow-y-auto p-1">
                    {(Object.keys(CATEGORIES_BY_TYPE) as BudgetType[]).map(
                      (type) => (
                        <div key={type} className="mb-1">
                          <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {type}
                          </p>
                          {CATEGORIES_BY_TYPE[type].map((cat) => (
                            <Label
                              key={`${type}-${cat.value}`}
                              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-normal hover:bg-accent"
                            >
                              <Checkbox id={`cat-${type}-${cat.value}`} />
                              {cat.label}
                            </Label>
                          ))}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer text-xs"
                    >
                      Clear
                    </Button>
                    <Button size="sm" className="cursor-pointer text-xs">
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search pe note */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="filter-search"
                className="text-xs text-muted-foreground"
              >
                Search
              </Label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="filter-search"
                  type="search"
                  placeholder="Notes…"
                  className="w-[200px] pl-9"
                />
              </div>
            </div>

            {/* Interval suma */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="filter-min"
                className="text-xs text-muted-foreground"
              >
                Amount
              </Label>
              <div className="flex items-center gap-1.5">
                <Input
                  id="filter-min"
                  type="number"
                  placeholder="Min"
                  className="w-[90px]"
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-[90px]"
                  aria-label="Maximum amount"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-muted-foreground"
            >
              <X size={16} />
              Clear all
            </Button>
          </div>

          {/* Chip-uri cu filtrele active */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
            <span className="text-xs text-muted-foreground">Active:</span>

            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Period: This month
              <button
                type="button"
                aria-label="Remove period filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
              >
                <X size={12} />
              </button>
            </Badge>

            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Category: Rent
              <button
                type="button"
                aria-label="Remove category filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
              >
                <X size={12} />
              </button>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ===== RAND 2: grafice ===== */}
      <div className="mb-6 grid items-start gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Income vs Expenses</CardTitle>
            <CardDescription>January – June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={barChartConfig}
              className="max-h-[280px] w-full"
            >
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
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <p className="flex items-center gap-2 font-medium">
              Trending up by 5.2% this month
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </p>
            <p className="text-muted-foreground">
              Showing totals for the last 6 months
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expenses trend</CardTitle>
            <CardDescription>January – June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={expensesConfig}
              className="max-h-[280px] w-full"
            >
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
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <p className="flex items-center gap-2 font-medium">
              April peak — highest expenses this period
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </p>
            <p className="text-muted-foreground">
              Monthly expenses over the last 6 months
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* ===== RAND 3: breakdown ===== */}
      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Cheltuieli fixe */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                <Pin
                  size={14}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
              <CardTitle className="text-sm">Cheltuieli fixe lunare</CardTitle>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Recurente
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2.5">
              {fixedCosts.map(({ label, amount, pct }) => (
                <li key={label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">
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
          </CardContent>

          <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Total fix lunar:{" "}
              <span className="font-semibold text-foreground tabular-nums">
                $1,560
              </span>
            </p>
          </CardFooter>
        </Card>

        {/* Cheltuieli variabile */}
        <Card className="border-orange-200 bg-orange-50/60 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/40">
                <AlertTriangle
                  size={14}
                  className="text-orange-500"
                  aria-hidden="true"
                />
              </span>
              <CardTitle className="text-sm">
                Cheltuieli variabile mari
              </CardTitle>
              <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                Optimizabile
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2.5">
              {variableCosts.map(({ label, amount, pct }) => (
                <li key={label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">
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
          </CardContent>

          <CardFooter className="border-t border-orange-200 pt-4 dark:border-orange-900">
            <p className="text-xs text-muted-foreground">
              Total variabil:{" "}
              <span className="font-semibold tabular-nums text-orange-600 dark:text-orange-400">
                $1,560
              </span>{" "}
              — potențial de reducere
            </p>
          </CardFooter>
        </Card>

        <AnalyticsRightColumn />
      </div>
    </section>
  );
}
