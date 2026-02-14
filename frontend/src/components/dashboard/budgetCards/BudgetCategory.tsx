import { Trash2, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function BudgetCategory({ value }) {
  return (
    <div className="flex items-center gap-4 mb-6 ">
      <div className="basis-4/5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Salary</span>
          <span className="font-medium">${value.toLocaleString()}</span>
        </div>
        <Progress value={70} className="h-2" />
      </div>
      <div className="flex basis-1/5 justify-center items-center gap-4 w-10 mt-3">
        <Trash2
          onClick={() => handleOpenDeleteModal()}
          className="cursor-pointer hover:text-red-600"
        />
        <Pencil className="cursor-pointer hover:text-blue-600" />
      </div>
    </div>
  );
}
