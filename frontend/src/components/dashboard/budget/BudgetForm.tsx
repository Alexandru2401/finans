import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns/format";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

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

interface BudgetFormProps {
  formData: {
    type: BudgetType;
    category: string;
    amount: string;
    notes: string;
    date: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<BudgetFormProps["formData"]>
  >;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function BudgetForm({
  handleSubmit,
  formData,
  setFormData,
}: BudgetFormProps) {
  const [formDate, setFormDate] = useState<Date | undefined>(new Date());

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleTypeChange(value: BudgetType) {
    const firstCategory = CATEGORIES_BY_TYPE[value][0].value;
    setFormData((prev) => ({ ...prev, type: value, category: firstCategory }));
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Type */}
      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={formData.type}
          onValueChange={(v) => handleTypeChange(v as BudgetType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expenses">Expense</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(v) =>
            setFormData((prev) => ({ ...prev, category: v }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES_BY_TYPE[formData.type].map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amount */}
      <div className="flex justify-between">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                data-empty={!formDate}
                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {formDate ? format(formDate, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formDate}
                onSelect={(d) => {
                  setFormDate(d);
                  setFormData((prev) => ({
                    ...prev,
                    date: d ? d.toISOString().split("T")[0] : "",
                  }));
                }}
                defaultMonth={formDate}
              />
            </PopoverContent>
          </Popover>
        </div></div>

      {/* Date */}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes about this entry..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none min-h-[80px] resize-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="cursor-pointer">
          Save item
        </Button>
      </div>
    </form>
  );
}
