import { Trash2, Pencil, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";

interface BudgetCategoryProps {
  id: string;
  category: string;
  amount: number;
  type: "income" | "expense" | "savings";
}

export default function BudgetCategory({
  id,
  category,
  amount,
  type,
}: BudgetCategoryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedCategory, setEditedCategory] = useState(category);

  const {
    totalIncome,
    totalExpenses,
    totalSavings,
    updateExpenseItem,
    updateIncomeItem,
    updateSavingsItem,
    deleteExpenseItem,
    deleteSavingsItem,
    deleteIncomeItem,
  } = useBudgetStore();

  function handleDelete() {
    switch (type) {
      case "income":
        deleteIncomeItem(id);
        break;
      case "expense":
        deleteExpenseItem(id);
        break;
      case "savings":
        deleteSavingsItem(id);
        break;
    }
  }

  function handleSave() {
    switch (type) {
      case "income":
        updateIncomeItem(id, editedAmount);
        break;
      case "expense":
        updateExpenseItem(id, editedAmount);
        break;
      case "savings":
        updateSavingsItem(id, editedAmount);
        break;
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedAmount(amount);
    setEditedCategory(category);
    setIsEditing(false);
  }

  const predefinedCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Business",
    "Rental Income",
    "Other",
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="basis-4/5">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-32 h-8 justify-start">
                  {editedCategory || "Choose a category"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  {predefinedCategories.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setEditedCategory(cat)}
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-gray-600">{category}</span>
          )}

          {isEditing ? (
            <Input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(parseFloat(e.target.value) || 0)}
              className="w-24 h-8 text-sm"
              autoFocus
            />
          ) : (
            <span className="text-sm font-medium">
              ${amount.toLocaleString()}
            </span>
          )}
        </div>
        <Progress
          value={Math.min(
            100,
            type === "income"
              ? (editedAmount / totalIncome) * 100
              : type === "expense"
                ? (editedAmount / totalExpenses) * 100
                : (editedAmount / totalSavings) * 100,
          )}
          className="h-2 mt-2"
        />
      </div>

      <div className="flex basis-1/5 justify-center items-center gap-3">
        {isEditing ? (
          <>
            <Check
              size={18}
              className="cursor-pointer hover:text-green-600 transition-colors"
              onClick={handleSave}
            />
            <Trash2
              size={18}
              className="cursor-pointer hover:text-red-600 transition-colors"
              onClick={handleCancel}
            />
          </>
        ) : (
          <>
            <Pencil
              size={18}
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setIsEditing(true)}
            />
            <Trash2
              size={18}
              className="cursor-pointer hover:text-red-600 transition-colors"
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}
