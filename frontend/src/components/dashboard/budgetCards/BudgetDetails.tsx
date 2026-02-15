import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import BudgetCategory from "./BudgetCategory";

interface BudgetDetailsProps {
  identifier: string;
  value: number;
}

export default function BudgetDetails({
  identifier,
  value,
}: BudgetDetailsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  const [newItems, setNewItems] = useState<
    Array<{ category: string; amount: number }>
  >([]);

  function handleAddNewCategory() {
    if (formData.category && formData.amount) {
      setNewItems((prevItems) => [
        ...prevItems,
        {
          category: formData.category,
          amount: parseFloat(formData.amount) || 0,
        },
      ]);

      setFormData({ category: "", amount: "" });
      setShowAddForm(false);
    }
  }

  function handleCancelAdd() {
    setFormData({ category: "", amount: "" });
    setShowAddForm(false);
  }

  const predefinedCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Business",
    "Rental Income",
    "Other",
  ];

  let hasIncome = true;
  const getDetailedContent = () => {
    switch (identifier) {
      case "income":
        return hasIncome ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold">Income Sources</p>
                <div
                  className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={16} />
                  <span className="text-sm" onClick={handleAddNewCategory}>
                    Add source
                  </span>
                </div>
              </div>

              {showAddForm && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {formData.category || "Choose a category"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuGroup>
                        {predefinedCategories.map((cat) => (
                          <DropdownMenuItem
                            key={cat}
                            onClick={() =>
                              setFormData({ ...formData, category: cat })
                            }
                          >
                            {cat}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Input
                    placeholder="Enter amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleAddNewCategory}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Check size={16} />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelAdd}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-4">
                <BudgetCategory category="Salary" amount={5000} />

                {newItems.map((item, index) => (
                  <BudgetCategory
                    key={index}
                    category={item.category}
                    amount={item.amount}
                  />
                ))}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Freelancing</span>
                  <span className="font-medium">
                    ${(value * 0.2).toLocaleString()}
                  </span>
                </div>
                <Progress value={20} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Investments</span>
                  <span className="font-medium">
                    ${(value * 0.1).toLocaleString()}
                  </span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">+8.5% vs last month</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              No data available for {identifier}
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus size={16} />
              Add first income source
            </Button>
          </div>
        );

      case "expenses":
        const categories = [
          { name: "Rent/Mortgage", amount: value * 0.35, budget: value * 0.4 },
          { name: "Food & Dining", amount: value * 0.25, budget: value * 0.25 },
          {
            name: "Transportation",
            amount: value * 0.15,
            budget: value * 0.15,
          },
          { name: "Utilities", amount: value * 0.12, budget: value * 0.1 },
          { name: "Entertainment", amount: value * 0.13, budget: value * 0.1 },
        ];

        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3">Expense Categories</p>
              <div className="space-y-3">
                {categories.map((cat, idx) => {
                  const percentage = (cat.amount / cat.budget) * 100;
                  const isOverBudget = percentage > 100;

                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">
                          {cat.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            ${cat.amount.toLocaleString()} / $
                            {cat.budget.toLocaleString()}
                          </span>
                          {isOverBudget && (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className={`h-2 ${isOverBudget ? "bg-red-100" : ""}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-gray-600">
                  Entertainment is 30% over budget
                </span>
              </div>
            </div>
          </div>
        );

      case "savings":
        const savingsGoal = 1500;
        const savingsPercentage = (value / savingsGoal) * 100;
        const monthsToGoal = Math.ceil((10000 - value * 3) / value);

        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Savings Goal Progress</p>
                <span className="text-xs text-gray-500">
                  Target: ${savingsGoal.toLocaleString()}/month
                </span>
              </div>
              <Progress value={savingsPercentage} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">
                You're saving {savingsPercentage.toFixed(0)}% of your goal
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-blue-900 mb-1">
                    Financial Goal
                  </p>
                  <p className="text-blue-700">
                    At this rate, you'll reach $10,000 in {monthsToGoal} months
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Quick Tips</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• Reduce entertainment by $100 to boost savings</li>
                <li>• Consider high-yield savings account (4-5% APY)</li>
                <li>• Automate savings on payday</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{getDetailedContent()}</div>;
}
