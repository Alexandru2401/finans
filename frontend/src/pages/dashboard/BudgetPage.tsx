import BudgetForm from "@/components/dashboard/budget/BudgetForm";
import ItemCard from "@/components/dashboard/budget/ItemCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  DollarSign,
  Home,
  Lightbulb,
  PiggyBank,
  Plus,
  SlidersHorizontal,
  Target,
  Pin,
  TrendingUp,
  Search,
  X
} from "lucide-react";
import { useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectContent, Select, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  BudgetItem,
  NewBudgetItem,
} from "@/store/dashboardStore/BudgetStoreContext";



type BudgetType = "income" | "expenses" | "savings";

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

const fixedCosts = [
  { label: "Chirie", amount: 1200, pct: 75 },
  { label: "Utilități", amount: 300, pct: 19 },
  { label: "Internet", amount: 60, pct: 4 },
]

interface SummaryProps {
  totalIncome: number,
  incomePct: number,
  budgetTargets: { income: number; expenses: number; savings: number };
  getBarColor: (pct: number, isExpenses?: boolean) => string;
  totalExpenses: number,
  expensesPct: number,
  totalSavings: number,
  savingsPct: number,
  netBalance: number,
  savingsRate: number
}


function SummaryCards({ totalIncome, incomePct, budgetTargets, getBarColor, totalExpenses, expensesPct, totalSavings, savingsPct, netBalance, savingsRate }: SummaryProps) {
  return <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 text-lg">
          <ArrowUpRight className="text-green-600 dark:text-green-400" />{" "}
          Income
        </CardTitle>

      </CardHeader>

      <CardContent>
        <p className="text-xl font-semibold">
          ${totalIncome.toFixed(2)}
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(incomePct)}% of target</span>
            <span>${budgetTargets.income.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-1.5 rounded-full transition-all ${getBarColor(incomePct)}`}
              style={{ width: `${incomePct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowDownRight className="text-red-600 dark:text-red-400" />{" "}
          Expenses
        </CardTitle>

      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold ">
          ${totalExpenses.toFixed(2)}
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(expensesPct)}% of limit</span>
            <span>${budgetTargets.expenses.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-1.5 rounded-full transition-all bg-red-500`}
              style={{ width: `${expensesPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PiggyBank className="text-sky-600 dark:text-sky-400" />{" "}
          Savings
        </CardTitle>

      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold">
          ${totalSavings.toFixed(2)}
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(savingsPct)}% of goal</span>
            <span>${budgetTargets.savings.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-1.5 rounded-full transition-all ${getBarColor(savingsPct)}`}
              style={{ width: `${savingsPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="text-violet-600 dark:text-violet-400" />{" "}
          Net balance
        </CardTitle>

      </CardHeader>
      <CardContent>
        <p className={`text-xl font-semibold`}>
          ${netBalance.toFixed(2)}
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Net margin</span>
            <span>{Math.round(savingsRate)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-1.5 rounded-full transition-all ${netBalance >= 0 ? "bg-violet-500" : "bg-violet-500"}`}
              style={{ width: `${Math.abs(savingsRate)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
}

export default function BudgetPage() {
  const {
    incomeItems,
    expenseItems,
    savingsItems,
    totalIncome,
    totalExpenses,
    totalSavings,
    addIncomeItem,
    addExpenseItem,
    addSavingsItem,
    deleteIncomeItem,
    deleteExpenseItem,
    deleteSavingsItem,
    editIncomeItem,
    editExpenseItem,
    editSavingsItem,
  } = useBudgetStore();

  const [showForm, setShowForm] = useState(false);
  // const [formDate, setFormDate] = useState<Date | undefined>(new Date());
  const [expanded, setExpanded] = useState({
    income: true,
    expenses: true,
    savings: true,
  });

  const [openFilters, setOpenFilters] = useState(false)
  const [formData, setFormData] = useState({
    type: "expenses" as BudgetType,
    category: "groceries",
    amount: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const netBalance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses],
  );

  function handleToggle(section: keyof typeof expanded) {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  // function handleChange(
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }

  // function handleTypeChange(value: BudgetType) {
  //   const firstCategory = CATEGORIES_BY_TYPE[value][0].value;
  //   setFormData((prev) => ({ ...prev, type: value, category: firstCategory }));
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const amount = Number(formData.amount);
    if (!amount || Number.isNaN(amount)) return;

    const payload = {
      type: formData.type,
      category: formData.category,
      amount: Number(formData.amount),
      notes: formData.notes.trim(),
      date: formData.date,
    };

    if (formData.type === "income") addIncomeItem(payload);
    else if (formData.type === "expenses") addExpenseItem(payload);
    else addSavingsItem(payload);

    console.log("Payload:", payload);

    setFormData((prev) => ({
      ...prev,
      category: CATEGORIES_BY_TYPE[prev.type][0].value,
      amount: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    }));
  }

  const sections = [
    {
      title: "Income",
      items: incomeItems,
      total: totalIncome,
      section: "income" as const,
      onDelete: deleteIncomeItem,
      onEdit: editIncomeItem,
    },
    {
      title: "Expenses",
      items: expenseItems,
      total: totalExpenses,
      section: "expenses" as const,
      onDelete: deleteExpenseItem,
      onEdit: editExpenseItem,
    },
    {
      title: "Savings",
      items: savingsItems,
      total: totalSavings,
      section: "savings" as const,
      onDelete: deleteSavingsItem,
      onEdit: editSavingsItem,
    },
  ];

  const budgetTargets = {
    income: 8000,
    expenses: 4000,
    savings: 1500,
  };

  const getBarColor = (pct: number, isExpenses = false) => {
    if (isExpenses) {
      if (pct >= 100) return "bg-red-500";
      if (pct >= 80) return "bg-amber-400";
      return "bg-green-500";
    }
    if (pct >= 100) return "bg-emerald-500";
    if (pct >= 50) return "bg-sky-500";
    return "bg-slate-300";
  };

  const incomePct = Math.min((totalIncome / budgetTargets.income) * 100, 100);
  const expensesPct = Math.min(
    (totalExpenses / budgetTargets.expenses) * 100,
    100,
  );
  const savingsPct = Math.min(
    (totalSavings / budgetTargets.savings) * 100,
    100,
  );
  const savingsRate =
    totalIncome > 0 ? Math.min((netBalance / totalIncome) * 100, 100) : 0;

  const insights = [
    {
      icon: <Target className="h-4 w-4" />,
      tone: "bg-emerald-50 text-emerald-700",
      label: "You're doing great!",
      value: `You've saved 222% of your goal this month.`,
    },
    {
      icon: <Home className="h-4 w-4" />,
      tone: "bg-red-50 text-red-700",
      label: "Top expense",
      value: "1000"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      tone: "bg-emerald-50 text-emerald-700",
      label: "Income trend",
      value: "50% vs last month",
    },
    {
      icon: <PiggyBank className="h-4 w-4" />,
      tone: "bg-blue-50 text-blue-700",
      label: "Savings rate",
      value: `${savingsRate}% of income`,
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      tone: "bg-violet-50 text-violet-700",
      label: "Days left in period",
      value: `2 days`,
    },
  ];

  return (
    <section className="relative py-4 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Budget Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track income, expenses, savings and add new budget items quickly.
          </p>
        </div>

        {/* TOGGLES */}
        <div className="flex flex-col md:items-end">
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer gap-2 text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
              data-active="true"
              onClick={() => setOpenFilters((prev) => !prev)}
            >
              <SlidersHorizontal size={16} />
              Filters

              <ChevronDown size={14} className="opacity-60" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer gap-2 text-muted-foreground"
            >
              <Target size={16} />
              Your Target
              <ChevronDown size={14} className="opacity-60" />
            </Button>

            <Button
              variant="default"
              onClick={() => setShowForm((prev) => !prev)}
              className="cursor-pointer max-w-34 md:w-auto"
            >
              <Plus size={16} />
              {showForm ? "Close" : "Add new entry"}
            </Button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary cards */}
        <div className="col-span-2 space-y-3">
          <SummaryCards totalIncome={totalIncome}
            incomePct={incomePct}
            budgetTargets={budgetTargets}
            getBarColor={getBarColor}
            totalExpenses={totalExpenses}
            expensesPct={expensesPct}
            totalSavings={totalSavings}
            savingsPct={savingsPct}
            netBalance={netBalance}
            savingsRate={savingsRate} />

          {/* Item sections */}
          <div className="grid items-start gap-6">
            <Tabs defaultValue="income" className="w-full">
              <TabsList>
                {sections.map((section) => (
                  <TabsTrigger key={section.section} value={section.section}>
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sections.map((section) => (
                <TabsContent key={section.section} value={section.section}>
                  <ItemCard
                    section={section}
                    expanded={expanded}
                    handleToggle={handleToggle}
                    onShowForm={() => setShowForm(true)}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between lg:flex-col gap-6">
          {/* Insight */}
          <div className="rounded-xl border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="h-4 w-4" style={{ color: "#ffd649" }} />
              Insights
            </div>
            <div className="flex flex-col gap-2">
              {insights.map((i) => (
                <div key={i.label} className="flex items-start gap-2 rounded-lg border p-3">
                  <span className={`rounded-md p-1.5 ${i.tone}`}>{i.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{i.label}</p>
                    <p className="truncate text-sm font-medium">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extra info */}

          <Card className="w-full">
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
        </div>

      </div>

      {/* Slide-in form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setShowForm(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 max-w-md overflow-y-auto bg-background shadow-2xl border-l border-muted/30 md:max-w-xl lg:max-w-2xl">
            <div className="flex items-center justify-between border-b border-muted/20 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold">Add a budget item</h2>
                <p className="text-sm text-muted-foreground">
                  Choose whether it's income, expense or savings.
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="cursor-pointer"
              >
                Close
              </Button>
            </div>

            <div className="p-6">
              <BudgetForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
              />
            </div>
          </aside>
        </>
      )}

      {openFilters && <Card className="mb-4 border border-slate-800 py-4 absolute top-39 md:top-20 max-w-1/2 md:max-w-1/3 md:right-15">
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
      </Card>}
    </section>
  );
}
