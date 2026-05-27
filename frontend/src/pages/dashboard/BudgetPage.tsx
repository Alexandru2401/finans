import BudgetForm from "@/components/dashboard/budget/BudgetForm";
import ItemCard from "@/components/dashboard/budget/ItemCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  PiggyBank,
  Plus,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";

type BudgetType = "income" | "expenses" | "savings";

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
  const [formDate, setFormDate] = useState<Date | undefined>(new Date());
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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleTypeChange(value: BudgetType) {
    const firstCategory = CATEGORIES_BY_TYPE[value][0].value;
    setFormData((prev) => ({ ...prev, type: value, category: firstCategory }));
  }

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Budget Overview</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track income, expenses, savings and add new budget items quickly.
          </p>
          {/* FILTERS */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 mt-2">
              <SlidersHorizontal size={16} />
              <p className="text-md text-slate-600">Filters</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Target size={16} />
              <p className="text-md text-slate-600">Your Target</p>
            </div>
          </div>
        </div>
        <Button
          variant="default"
          onClick={() => setShowForm((prev) => !prev)}
          className="cursor-pointer"
        >
          <Plus size={16} />
          {showForm ? "Close" : "Add entry"}
        </Button>
      </div>

      {/* Summary cards */}
      <div className="space-y-6 mb-8">
        <div className="grid gap-3 md:grid-cols-4">
          <Card className="border border-green-200 bg-green-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-1 text-lg">
                <ArrowUpRight className="text-green-600" /> Income
              </CardTitle>
              <CardDescription>Total incoming money</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-semibold text-green-700">
                ${totalIncome.toFixed(2)}
              </p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{Math.round(incomePct)}% of target</span>
                  <span>${budgetTargets.income.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full transition-all ${getBarColor(incomePct)}`}
                    style={{ width: `${incomePct}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200 bg-red-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowDownRight className="text-red-600" /> Expenses
              </CardTitle>
              <CardDescription>Total spending this period</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-red-700">
                ${totalExpenses.toFixed(2)}
              </p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{Math.round(expensesPct)}% of limit</span>
                  <span>${budgetTargets.expenses.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full transition-all ${getBarColor(expensesPct, true)}`}
                    style={{ width: `${expensesPct}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-sky-200 bg-sky-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PiggyBank className="text-sky-600" /> Savings
              </CardTitle>
              <CardDescription>Money you are setting aside</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-sky-700">
                ${totalSavings.toFixed(2)}
              </p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{Math.round(savingsPct)}% of goal</span>
                  <span>${budgetTargets.savings.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full transition-all ${getBarColor(savingsPct)}`}
                    style={{ width: `${savingsPct}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-violet-200 bg-violet-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="text-violet-600" /> Net balance
              </CardTitle>
              <CardDescription>Income minus expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className={`text-3xl font-semibold ${netBalance >= 0 ? "text-emerald-700" : "text-rose-700"}`}
              >
                ${netBalance.toFixed(2)}
              </p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Savings rate</span>
                  <span>{Math.round(savingsRate)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full transition-all ${netBalance >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                    style={{ width: `${Math.abs(savingsRate)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Item sections */}
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <ItemCard
              onShowForm={() => setShowForm(true)}
              key={section.section}
              section={section}
              expanded={expanded}
              handleToggle={handleToggle}
            />
          ))}
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
