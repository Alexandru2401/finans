import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  DollarSign,
  Plus,
  PiggyBank,
  Trash2,
  Pencil,
  Minus,
} from "lucide-react";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ItemCard from "@/components/dashboard/ItemCard";

type BudgetType = "income" | "expenses" | "savings";

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
  } = useBudgetStore();

  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState({
    income: true,
    expenses: true,
    savings: true,
  });
  const [formData, setFormData] = useState({
    type: "expenses" as BudgetType,
    category: "",
    amount: "",
  });

  const netBalance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses],
  );

  function handleToggle(section: keyof typeof expanded) {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const category = formData.category.trim();
    const amount = Number(formData.amount);
    if (!category || !amount || Number.isNaN(amount)) {
      return;
    }

    if (formData.type === "income") {
      addIncomeItem(category, amount);
    } else if (formData.type === "expenses") {
      addExpenseItem(category, amount);
    } else {
      addSavingsItem(category, amount);
    }

    setFormData({ type: formData.type, category: "", amount: "" });
  }

  const dummyData = [
    {
      title: "Income",
      items: incomeItems,
      total: totalIncome,
      section: "income" as const,
      onDelete: deleteIncomeItem,
      onEdit: "",
    },
    {
      title: "Expenses",
      items: expenseItems,
      total: totalExpenses,
      section: "expenses" as const,
      onDelete: deleteExpenseItem,
      onEdit: "",
    },
    {
      title: "Savings",
      items: savingsItems,
      total: totalSavings,
      section: "savings" as const,
      onDelete: deleteSavingsItem,
      onEdit: "",
    },
  ];

  return (
    <section className="relative py-8 px-4  max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Budget Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track income, expenses, savings and add new budget items quickly.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <Plus size={16} />
          {showForm ? "Close" : "Add entry"}
        </Button>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border border-green-200 bg-green-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowUpRight className="text-green-600" /> Income
              </CardTitle>
              <CardDescription>Total incoming money</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-green-700">
                ${totalIncome.toFixed(2)}
              </p>
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {dummyData.map((section) => (
            <ItemCard
              key={section.section}
              section={section}
              expanded={expanded}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {showForm ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setShowForm(false)}
          />
          <aside
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-background shadow-2xl border-l border-muted/30 transition-transform duration-300 md:max-w-xl lg:max-w-2xl"
            style={{
              transform: showForm ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="flex items-center justify-between border-b border-muted/20 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold">Add a budget item</h2>
                <p className="text-sm text-muted-foreground">
                  Choose whether it's income, expense or savings.
                </p>
              </div>
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                Close
              </Button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    name="type"
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-base outline-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="income">Income</option>
                    <option value="expenses">Expense</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Salary, Rent, Emergency Fund"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save item</Button>
                </div>
              </form>
            </div>
          </aside>
        </>
      ) : null}
    </section>
  );
}
