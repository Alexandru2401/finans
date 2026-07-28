import BudgetForm from "@/components/dashboard/budget/BudgetForm";
import ItemCard from "@/components/dashboard/budget/ItemCard";
import { Button } from "@/components/ui/button";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";
import {
  ChevronDown,
  Plus,
  SlidersHorizontal,
  Target
} from "lucide-react";
import { useMemo, useState } from "react";

import BudgetFilters from "@/components/dashboard/budget/BudgetFilters";
import ExtraInfo from "@/components/dashboard/budget/ExtraInfo";
import Insights from "@/components/dashboard/budget/Insights";
import SummaryCards from "@/components/dashboard/budget/SummaryCards";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  BudgetItem,
  NewBudgetItem,
} from "@/store/dashboardStore/BudgetStoreContext";



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
          <Insights />

          {/* Extra info */}
          <ExtraInfo />
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

      {openFilters && <BudgetFilters />}
    </section>
  );
}
