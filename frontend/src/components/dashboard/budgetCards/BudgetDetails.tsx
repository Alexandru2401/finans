import { Input } from "@/components/ui/input";
import { TrendingUp, Check, X, Plus } from "lucide-react";
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

import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";

interface BudgetDetailsProps {
  identifier: string;
  value: number;
}

export default function BudgetDetails({ identifier }: BudgetDetailsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  const {
    incomeItems,
    expenseItems,
    savingsItems,
    addIncomeItem,
    addExpenseItem,
    addSavingsItem,
  } = useBudgetStore();

  function handleAddNewCategory() {
    if (formData.category && formData.amount) {
      const amount = parseFloat(formData.amount) || 0;

      switch (identifier) {
        case "income":
          addIncomeItem(formData.category, amount);
          break;
        case "expenses":
          addExpenseItem(formData.category, amount);
          break;
        case "savings":
          addSavingsItem(formData.category, amount);
          break;
      }

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

  const getDetailedContent = () => {
    switch (identifier) {
      case "income":
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold">Income Sources</p>
                <div
                  className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={16} />
                  <span className="text-sm">Add source</span>
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
                      className="flex items-center gap-2"
                    >
                      <Check size={16} />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelAdd}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-4">
                {incomeItems.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No income sources yet. Add one above!
                  </p>
                ) : (
                  incomeItems.map((item) => (
                    <BudgetCategory
                      key={item.id}
                      id={item.id}
                      category={item.category}
                      amount={item.amount}
                      type="income"
                    />
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">+8.5% vs last month</span>
              </div>
            </div>
          </div>
        );

      case "expenses":
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold">Expense Categories</p>
                <div
                  className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={16} />
                  <span className="text-sm">Add expense</span>
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
                      className="flex items-center gap-2"
                    >
                      <Check size={16} />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelAdd}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-4">
                {expenseItems.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No expenses yet. Add one above!
                  </p>
                ) : (
                  expenseItems.map((item) => (
                    <BudgetCategory
                      key={item.id}
                      id={item.id}
                      category={item.category}
                      amount={item.amount}
                      type="expense"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case "savings":
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold">Savings Goals</p>
                <div
                  className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={16} />
                  <span className="text-sm">Add savings goal</span>
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
                      className="flex items-center gap-2"
                    >
                      <Check size={16} />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelAdd}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-4">
                {savingsItems.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No savings goals yet. Add one above!
                  </p>
                ) : (
                  savingsItems.map((item) => (
                    <BudgetCategory
                      key={item.id}
                      id={item.id}
                      category={item.category}
                      amount={item.amount}
                      type="savings"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{getDetailedContent()}</div>;
}
