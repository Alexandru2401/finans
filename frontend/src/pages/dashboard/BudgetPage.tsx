import BudgetForm from "@/components/dashboard/budget/BudgetForm";
import ItemCard from "@/components/dashboard/budget/ItemCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, SlidersHorizontal, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import BudgetFilters from "@/components/dashboard/budget/BudgetFilters";
import ExtraInfo from "@/components/dashboard/budget/ExtraInfo";
import Insights from "@/components/dashboard/budget/Insights";
import SummaryCards from "@/components/dashboard/budget/SummaryCards";
import { Spinner } from "@/components/ui/spinner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TargetsPanel from "@/components/dashboard/budget/TargetsPanel";
import {
  getBudgetData,
  addIncomeItem as apiAddIncome,
  addExpenseItem as apiAddExpense,
  addSavingsItem as apiAddSavings,
  editIncomeItem as apiEditIncome,
  editExpenseItem as apiEditExpense,
  editSavingsItem as apiEditSavings,
  deleteIncomeItem as apiDeleteIncome,
  deleteExpenseItem as apiDeleteExpense,
  deleteSavingsItem as apiDeleteSavings,
  type BudgetItem,
  type NewBudgetItem,
} from "@/api/budget";
import PageHeader from "@/components/dashboard/shared/PageHeader";

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

export interface Section {
  title: string;
  items: BudgetItem[];
  total: number;
  section: "income" | "expenses" | "savings";
  onDelete: (id: string) => void;
  onEdit: (id: string, payload: Partial<NewBudgetItem>) => void;
}

export default function BudgetPage() {
  const [incomeItems, setIncomeItems] = useState<BudgetItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<BudgetItem[]>([]);
  const [savingsItems, setSavingsItems] = useState<BudgetItem[]>([]);
  const [activeTab, setActiveTab] = useState<"income" | "expenses" | "savings">(
    "income",
  );
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  const [openTargets, setOpenTargets] = useState(false);
  const [budgetTargets, setBudgetTargets] = useState({
    income: 8000,
    expenses: 4000,
    savings: 1500,
  });

  const [formData, setFormData] = useState({
    type: "expenses" as BudgetType,
    category: "groceries",
    amount: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getBudgetData()
      .then((res) => {
        if (res.ok) {
          setIncomeItems(res.data.income);
          setExpenseItems(res.data.expenses);
          setSavingsItems(res.data.savings);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalIncome = useMemo(
    () => incomeItems.reduce((s, i) => s + i.amount, 0),
    [incomeItems],
  );
  const totalExpenses = useMemo(
    () => expenseItems.reduce((s, i) => s + i.amount, 0),
    [expenseItems],
  );
  const totalSavings = useMemo(
    () => savingsItems.reduce((s, i) => s + i.amount, 0),
    [savingsItems],
  );
  const netBalance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const amount = Number(formData.amount);
    if (!amount || Number.isNaN(amount)) return;

    const payload: NewBudgetItem = {
      category: formData.category,
      amount,
      notes: formData.notes.trim(),
      date: formData.date,
    };

    if (formData.type === "income") {
      const res = await apiAddIncome(payload);
      if (res.ok) setIncomeItems((prev) => [...prev, res.data]);
    } else if (formData.type === "expenses") {
      const res = await apiAddExpense(payload);
      if (res.ok) setExpenseItems((prev) => [...prev, res.data]);
    } else {
      const res = await apiAddSavings(payload);
      if (res.ok) setSavingsItems((prev) => [...prev, res.data]);
    }

    setFormData((prev) => ({
      ...prev,
      category: CATEGORIES_BY_TYPE[prev.type][0].value,
      amount: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    }));
  }

  async function deleteIncomeItem(id: string) {
    const res = await apiDeleteIncome(id);
    if (res.ok) setIncomeItems((prev) => prev.filter((i) => i.id !== id));
  }
  async function deleteExpenseItem(id: string) {
    const res = await apiDeleteExpense(id);
    if (res.ok) setExpenseItems((prev) => prev.filter((i) => i.id !== id));
  }
  async function deleteSavingsItem(id: string) {
    const res = await apiDeleteSavings(id);
    if (res.ok) setSavingsItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function editIncomeItem(id: string, payload: Partial<NewBudgetItem>) {
    const res = await apiEditIncome(id, payload);
    if (res.ok)
      setIncomeItems((prev) => prev.map((i) => (i.id === id ? res.data : i)));
  }
  async function editExpenseItem(id: string, payload: Partial<NewBudgetItem>) {
    const res = await apiEditExpense(id, payload);
    if (res.ok)
      setExpenseItems((prev) => prev.map((i) => (i.id === id ? res.data : i)));
  }
  async function editSavingsItem(id: string, payload: Partial<NewBudgetItem>) {
    const res = await apiEditSavings(id, payload);
    if (res.ok)
      setSavingsItems((prev) => prev.map((i) => (i.id === id ? res.data : i)));
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="relative py-4 px-4 max-w-7xl mx-auto">
      <PageHeader
        title="Budget Overview"
        subtitle="Track income, expenses, savings and add new budget items quickly."
      >
        {" "}
        <div className="flex flex-col md:items-end">
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-2"
              data-active="true"
              onClick={() => setOpenFilters((prev) => !prev)}
            >
              <SlidersHorizontal size={16} />
              Filters
              <ChevronDown size={14} className="opacity-60" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenTargets(true)}
              className="cursor-pointer gap-2"
            >
              <Target size={16} />
              Your Target
            </Button>

            <Button
              variant="default"
              onClick={() => setShowForm((prev) => !prev)}
              className="cursor-pointer max-w-34 md:w-auto"
              size="sm"
            >
              <Plus size={16} />
              {showForm ? "Close" : "Add new entry"}
            </Button>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          <SummaryCards
            totalIncome={totalIncome}
            incomePct={incomePct}
            budgetTargets={budgetTargets}
            totalExpenses={totalExpenses}
            expensesPct={expensesPct}
            totalSavings={totalSavings}
            savingsPct={savingsPct}
            netBalance={netBalance}
            savingsRate={savingsRate}
          />

          <div className="grid items-start gap-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as typeof activeTab)}
              className="w-full"
            >
              <TabsList>
                {sections.map((section) => (
                  <TabsTrigger
                    key={section.section}
                    value={section.section}
                    className="cursor-pointer"
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sections.map((section) => (
                <TabsContent key={section.section} value={section.section}>
                  <ItemCard
                    section={section}
                    onShowForm={() => setShowForm(true)}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between lg:flex-col gap-6">
          <Insights />
          <ExtraInfo activeTab={activeTab} />
        </div>
      </div>

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

      {openFilters && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpenFilters(false)}
          />
          <BudgetFilters />
        </>
      )}

      {openTargets && (
        <TargetsPanel
          targets={budgetTargets}
          onSave={setBudgetTargets}
          onClose={() => setOpenTargets(false)}
        />
      )}
    </section>
  );
}
