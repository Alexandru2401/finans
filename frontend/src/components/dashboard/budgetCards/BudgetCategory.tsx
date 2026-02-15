import { Trash2, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BudgetCategoryProps {
  value: number;
}

export default function BudgetCategory({ value }: BudgetCategoryProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="basis-4/5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Salary</span>
          <span className="font-medium">${value.toLocaleString()}</span>
        </div>
        <Progress value={70} className="h-2 mt-1" />
      </div>
      <div className="flex basis-1/5 justify-center items-center gap-4">
        <Trash2
          size={18}
          className="cursor-pointer hover:text-red-600 transition-colors"
        />
        <Pencil
          size={18}
          className="cursor-pointer hover:text-blue-600 transition-colors"
        />
      </div>
    </div>
  );
}
