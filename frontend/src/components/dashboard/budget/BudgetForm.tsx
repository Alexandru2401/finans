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
import { parseISO } from "date-fns/parseISO";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import BudgetItemSchema, {
  NOTES_MAX_LENGTH,
  type BudgetItemInput,
} from "@/schemas/budget-item.schema";

type BudgetType = BudgetItemInput["type"];

type FormErrors = { amount?: string; notes?: string };

const NOTES_WARNING_THRESHOLD = 100;

const artificialDelay = (ms = 2000) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0) {
        resolve(undefined);
      } else {
        reject(new Error("Simulated error"));
      }
    }, ms),
  );

// Simulates a request until the API is wired up
const fakeRequest = <T,>(data: T) => artificialDelay().then(() => data);

// yyyy-MM-dd in local time (toISOString would shift the day in UTC+ timezones)
const toDateString = (d: Date) => format(d, "yyyy-MM-dd");

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

export default function BudgetForm() {
  const [formData, setFormData] = useState<BudgetItemInput>({
    type: "income",
    category: "salary",
    amount: "",
    notes: "",
    date: toDateString(new Date()),
  });

  const amountRef = useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const notesRemaining = NOTES_MAX_LENGTH - formData.notes.length;
  const notesNearLimit = notesRemaining <= NOTES_WARNING_THRESHOLD;
  const selectedDate = formData.date ? parseISO(formData.date) : undefined;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleTypeChange(value: BudgetType) {
    const firstCategory = CATEGORIES_BY_TYPE[value][0].value;
    setFormData((prev) => ({ ...prev, type: value, category: firstCategory }));
  }

  function handleDateSelect(d: Date | undefined) {
    if (!d) return;
    setFormData((prev) => ({ ...prev, date: toDateString(d) }));
    setDateOpen(false);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const result = BudgetItemSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setFormErrors({
        amount: fieldErrors.amount?.[0],
        notes: fieldErrors.notes?.[0],
      });
      if (fieldErrors.amount) amountRef.current?.focus();
      return;
    }

    setFormErrors({});

    setSubmitting(true);
    try {
      // TODO: replace with the real API call
      await fakeRequest(result.data);

      toast.success("Budget item added successfully!");

      setFormData((prev) => ({
        ...prev,
        category: CATEGORIES_BY_TYPE[prev.type][0].value,
        amount: "",
        notes: "",
        date: toDateString(new Date()),
      }));
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not save the item. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <fieldset disabled={submitting} className="grid min-w-0 gap-4">
        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(v) => handleTypeChange(v as BudgetType)}
          >
            <SelectTrigger id="type" className="w-full">
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
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(v) =>
              setFormData((prev) => ({ ...prev, category: v }))
            }
          >
            <SelectTrigger id="category" className="w-full">
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

        {/* Amount + Date */}
        <div className="flex justify-between gap-4">
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
              ref={amountRef}
              aria-invalid={!!formErrors.amount}
              aria-describedby={formErrors.amount ? "amount-error" : undefined}
            />
            {formErrors.amount && (
              <p
                id="amount-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {formErrors.amount}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  type="button"
                  variant="outline"
                  data-empty={!formData.date}
                  className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  required
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  defaultMonth={selectedDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            maxLength={NOTES_MAX_LENGTH}
            aria-invalid={!!formErrors.notes}
            aria-describedby={
              formErrors.notes ? "notes-error notes-counter" : "notes-counter"
            }
            placeholder="Optional notes about this entry..."
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none min-h-40 resize-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
          <p
            id="notes-counter"
            aria-live={notesNearLimit ? "polite" : "off"}
            className={`text-right text-xs tabular-nums ${
              notesNearLimit ? "text-finance-danger" : "text-muted-foreground"
            }`}
          >
            {formData.notes.length}/{NOTES_MAX_LENGTH}
          </p>
          {formErrors.notes && (
            <p
              id="notes-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {formErrors.notes}
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="cursor-pointer"
        >
          {submitting && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {submitting ? "Saving..." : "Save item"}
        </Button>
      </div>
    </form>
  );
}
