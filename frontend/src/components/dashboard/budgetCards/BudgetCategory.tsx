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

interface BudgetCategoryProps {
  category: string;
  amount: number;
}

export default function BudgetCategory({
  category,
  amount,
}: BudgetCategoryProps) {
  const [formData, setFormData] = useState({
    category: category,
    amount: amount,
  });

  const [isEditing, setIsEditing] = useState(true);

  function handleStartEditValue() {
    setIsEditing((prev) => !prev);
  }

  function handleDeleteItem(category: string) {
    console.log("Delete item:", category);
    setFormData((prevValue) => ({
      ...prevValue,
      category: "",
      amount: 0,
    }));
  }

  const predefinedCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Business",
    "Rental Income",
    "Other",
  ];

  console.log("Value:", formData.amount);
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="basis-4/5">
        <div className="flex justify-between ">
          {isEditing ? (
            <span className="text-sm text-gray-600 mb-2">
              {formData.category}
            </span>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-32 h-8 justify-start">
                  {formData.category || "Choose a category"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
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
          )}
          {isEditing ? (
            <span className="text-sm text-gray-600 mb-2">
              {formData.amount}
            </span>
          ) : (
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
              className="w-24 h-8 text-sm mb-1"
            />
          )}
        </div>
        <Progress value={70} className="h-2 mt-1" />
      </div>

      <div className="flex basis-1/5 justify-center items-center gap-4">
        <Trash2
          size={18}
          className="cursor-pointer hover:text-red-600 transition-colors"
          onClick={() => handleDeleteItem(formData.category)}
        />
        {isEditing ? (
          <Pencil
            size={18}
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleStartEditValue}
          />
        ) : (
          <Check
            size={18}
            className="cursor-pointer hover:text-green-600 transition-colors"
            onClick={handleStartEditValue}
          />
        )}
      </div>
    </div>
  );
}
