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
} from "@/components/ui/card";
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
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  DollarSign,
  PiggyBank,
  Plus,
  Search,
  SlidersHorizontal,
  Target,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Budget Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track income, expenses, savings and add new budget items quickly.
          </p>

          {/* TOGGLES */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer gap-2 text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
              data-active="true"
            >
              <SlidersHorizontal size={16} />
              Filters
              <Badge
                variant="secondary"
                className="ml-1 h-5 min-w-5 justify-center rounded-full px-1 text-[11px]"
              >
                2
              </Badge>
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
          </div>
        </div>

        <Button
          variant="default"
          onClick={() => setShowForm((prev) => !prev)}
          className="cursor-pointer w-34 md:w-auto"
        >
          <Plus size={16} />
          {showForm ? "Close" : "Add new entry"}
        </Button>
      </div>

      {/* ===== FILTERS PANEL (randat static — leaga-l de un state showFilters) ===== */}
      {/* DE FACUT SHEET DIN DREAPTA PE MOBILE */}
      <div className="grid grid-cols-3 gap-6">

        {/* ===== TARGETS PANEL (randat static — leaga-l de un state showTargets) ===== */}
        {/* DE FACUT CARUSEL PE MOBILE */}
        {/* <Card className="mb-6 border-dashed py-4">
          <CardContent className="px-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="target-income"
                  className="text-xs text-muted-foreground"
                >
                  Income target
                </Label>
                <Input
                  id="target-income"
                  type="number"
                  defaultValue={budgetTargets.income}
                  className="w-[130px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="target-expenses"
                  className="text-xs text-muted-foreground"
                >
                  Expenses limit
                </Label>
                <Input
                  id="target-expenses"
                  type="number"
                  defaultValue={budgetTargets.expenses}
                  className="w-[130px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="target-savings"
                  className="text-xs text-muted-foreground"
                >
                  Savings goal
                </Label>
                <Input
                  id="target-savings"
                  type="number"
                  defaultValue={budgetTargets.savings}
                  className="w-[130px]"
                />
              </div>
              <Button size="sm" className="cursor-pointer">
                Save targets
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Summary cards */}
        <div className="col-span-2 space-y-6 mb-8">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-lg">
                  <ArrowUpRight className="text-green-600 dark:text-green-400" />{" "}
                  Income
                </CardTitle>
                <CardDescription>Total incoming money</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xl font-semibold text-green-700 dark:text-green-400">
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

            <Card className="border border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowDownRight className="text-red-600 dark:text-red-400" />{" "}
                  Expenses
                </CardTitle>
                <CardDescription>Total spending this period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-red-700 dark:text-red-400">
                  ${totalExpenses.toFixed(2)}
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(expensesPct)}% of limit</span>
                    <span>${budgetTargets.expenses.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-1.5 rounded-full transition-all ${getBarColor(expensesPct, true)}`}
                      style={{ width: `${expensesPct}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-sky-200 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PiggyBank className="text-sky-600 dark:text-sky-400" /> Savings
                </CardTitle>
                <CardDescription>Money you are setting aside</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-sky-700 dark:text-sky-400">
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

            <Card className="border border-violet-200 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="text-violet-600 dark:text-violet-400" />{" "}
                  Net balance
                </CardTitle>
                <CardDescription>Income minus expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-xl font-semibold ${netBalance >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}
                >
                  ${netBalance.toFixed(2)}
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Net margin</span>
                    <span>{Math.round(savingsRate)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-1.5 rounded-full transition-all ${netBalance >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${Math.abs(savingsRate)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* // DE ADAUGAT DOAR ULTIMELE 5 TRANZACTII PT FIECARE DE AICI, RESUL LE VEDE IN TRANSATION, ELIMIN SI SCROLL SI TOT */}
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

        <div className="grid-cols-2">
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
                  <Input id="filter-to" type="date" className="w-[150px]" disabled />
                </div>

                {/* Categorii — multi-select grupat pe tip */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">Categories</Label>
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
                        {(
                          Object.keys(CATEGORIES_BY_TYPE) as BudgetType[]
                        ).map((type) => (
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
                        ))}
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
        </div>

      </div>

      {/* Slide-in form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setShowForm(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-background shadow-2xl border-l border-muted/30 md:max-w-xl lg:max-w-2xl">
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
    </section>
  );
}