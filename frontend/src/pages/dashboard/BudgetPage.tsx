import { useState } from "react";
import BudgetCards from "@/components/dashboard/budgetCards/BudgetCards";

export default function BudgetPage() {
  const [budgetData, setBudgetData] = useState({
    income: 5200,
    expenses: 3200,
    savings: 2000,
  });

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
      [identifier]: !prev[identifier],
    }));
  }

  function handleInputChange(identifier: string, value: string) {
    setBudgetData((prev) => ({
      ...prev,
      [identifier]: parseFloat(value) || 0,
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
          value={budgetData.income}
          isEditing={isEditing.income}
          isExpanded={isExpanded.income}
          iconColor="text-green-500"
          badgeColor="bg-green-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onChange={handleInputChange}
          onExpand={handleExpanded}
        />

        <BudgetCards
          title="Expenses"
          identifier="expenses"
          value={budgetData.expenses}
          isEditing={isEditing.expenses}
          isExpanded={isExpanded.expenses}
          iconColor="text-red-500"
          badgeColor="bg-red-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onChange={handleInputChange}
          onExpand={handleExpanded}
        />

        <BudgetCards
          title="Savings"
          identifier="savings"
          value={budgetData.savings}
          isEditing={isEditing.savings}
          isExpanded={isExpanded.savings}
          iconColor="text-blue-500"
          badgeColor="bg-blue-500"
          onEdit={handleEdit}
          onSave={handleSave}
          onChange={handleInputChange}
          onExpand={handleExpanded}
        />
      </div>
    </section>
  );
}
