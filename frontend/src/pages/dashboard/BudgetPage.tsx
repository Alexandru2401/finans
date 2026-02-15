import { useState } from "react";
import BudgetCards from "@/components/dashboard/budgetCards/BudgetCards";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";

export default function BudgetPage() {
  const {
    incomeItems,
    expenseItems,
    savingsItems,
    totalIncome,
    totalExpenses,
    totalSavings,
  } = useBudgetStore();

  const [isEditing, setIsEditing] = useState({
    income: false,
    expenses: false,
    savings: false,
  });

  const [isExpanded, setIsExpanded] = useState({
    income: false,
    expenses: false,
    savings: false,
  });

  function handleExpanded(identifier: string) {
    setIsExpanded((prev) => ({
      ...prev,
      [identifier]: !prev[identifier as keyof typeof prev],
    }));
  }

  function handleEdit(identifier: string) {
    setIsEditing((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  function handleSave(identifier: string) {
    setIsEditing((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  }

  console.log("Is expanded:", isExpanded);

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Budget Overview</h1>

      <div className="grid grid-cols-2 gap-8">
        <BudgetCards
          title="Income"
          identifier="income"
          value={totalIncome}
          isEditing={isEditing.income}
          isExpanded={isExpanded.income}
          iconColor="text-green-500"
          badgeColor="bg-green-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onExpand={handleExpanded}
        />

        <BudgetCards
          title="Expenses"
          identifier="expenses"
          value={totalExpenses}
          isEditing={isEditing.expenses}
          isExpanded={isExpanded.expenses}
          iconColor="text-red-500"
          badgeColor="bg-red-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onExpand={handleExpanded}
        />

        <BudgetCards
          title="Savings"
          identifier="savings"
          value={totalSavings}
          isEditing={isEditing.savings}
          isExpanded={isExpanded.savings}
          iconColor="text-blue-500"
          badgeColor="bg-blue-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onExpand={handleExpanded}
        />
      </div>
    </section>
  );
}
