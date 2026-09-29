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
import { ChevronDownIcon, Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import BudgetItemSchema, {
  NOTES_MAX_LENGTH,
  type BudgetItemInput,
  type BudgetItemPayload,
} from "@/schemas/budget-item.schema";
import {
  addNewTransaction,
  createCategory,
  getCategories,
  type Category,
} from "@/api/budget";

type BudgetType = BudgetItemInput["type"];

type FormErrors = { category?: string; amount?: string; notes?: string };

const NOTES_WARNING_THRESHOLD = 100;

// yyyy-MM-dd in local time (toISOString would shift the day in UTC+ timezones)
const toDateString = (d: Date) => format(d, "yyyy-MM-dd");

const CATEGORY_NAME_MAX_LENGTH = 40;

interface BudgetFormProps {
  onCreated?: (type: BudgetItemPayload["type"]) => void;
}

export default function BudgetForm({ onCreated }: BudgetFormProps) {
  const [formData, setFormData] = useState<BudgetItemInput>({
    type: "income",
    category: "",
    amount: "",
    notes: "",
    date: toDateString(new Date()),
  });

  const amountRef = useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  // Categories for the currently selected type
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryError, setNewCategoryError] = useState<string>();
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Refetch categories whenever the type changes
  useEffect(() => {
    let cancelled = false;

    setCategoriesLoading(true);
    setCategories([]);

    getCategories(formData.type)
      .then((data) => {
        if (cancelled) return;
        setCategories(data);
        setFormData((prev) => ({
          ...prev,
          category: data[0]?.category_id ?? "",
        }));
      })
      .catch((err) => {
        if (cancelled) return;
        toast.error(
          err instanceof Error ? err.message : "Could not load categories",
        );
      })
      .finally(() => {
        if (!cancelled) setCategoriesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.type]);

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
    setFormData((prev) => ({ ...prev, type: value, category: "" }));
  }

  function handleNewCategoryOpenChange(open: boolean) {
    setNewCategoryOpen(open);
    if (!open) {
      setNewCategoryName("");
      setNewCategoryError(undefined);
    }
  }

  async function handleAddCategory() {
    if (creatingCategory) return;

    const name = newCategoryName.trim();

    if (!name) {
      setNewCategoryError("Please enter a category name.");
      return;
    }

    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === name.toLowerCase(),
    );
    if (exists) {
      setNewCategoryError("This category already exists.");
      return;
    }

    setCreatingCategory(true);
    try {
      const category = await createCategory({ type: formData.type, name });

      setCategories((prev) => [...prev, category]);
      setFormData((prev) => ({ ...prev, category: category.category_id }));
      handleNewCategoryOpenChange(false);
      toast.success(`Category "${category.name}" added.`);
    } catch (err) {
      setNewCategoryError(
        err instanceof Error ? err.message : "Could not create category",
      );
    } finally {
      setCreatingCategory(false);
    }
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
        category: fieldErrors.category?.[0],
        amount: fieldErrors.amount?.[0],
        notes: fieldErrors.notes?.[0],
      });
      if (fieldErrors.amount) amountRef.current?.focus();
      return;
    }

    setFormErrors({});

    setSubmitting(true);
    try {
      await addNewTransaction(result.data);

      toast.success("Budget item added successfully!");
      onCreated?.(result.data.type);

      setFormData((prev) => ({
        ...prev,
        category: categories[0]?.category_id ?? "",
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
          <div className="flex items-center justify-between">
            <Label htmlFor="category">Category</Label>
            <Popover
              open={newCategoryOpen}
              onOpenChange={handleNewCategoryOpenChange}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 cursor-pointer gap-1 px-2 text-xs text-muted-foreground"
                >
                  <Plus className="h-3 w-3" aria-hidden="true" />
                  Add new category
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 space-y-2" align="end">
                <Label htmlFor="new-category">New category</Label>
                {/* Not a nested <form>: submit events would bubble to the parent form through the portal */}
                <div className="flex gap-2">
                  <Input
                    id="new-category"
                    autoFocus
                    value={newCategoryName}
                    disabled={creatingCategory}
                    maxLength={CATEGORY_NAME_MAX_LENGTH}
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      setNewCategoryError(undefined);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                    placeholder="e.g. Gym"
                    aria-invalid={!!newCategoryError}
                    aria-describedby={
                      newCategoryError ? "new-category-error" : undefined
                    }
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="h-9 cursor-pointer"
                    onClick={handleAddCategory}
                    disabled={creatingCategory}
                    aria-busy={creatingCategory}
                  >
                    {creatingCategory ? (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
                {newCategoryError && (
                  <p
                    id="new-category-error"
                    role="alert"
                    className="text-xs text-destructive"
                  >
                    {newCategoryError}
                  </p>
                )}
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={formData.category}
            onValueChange={(v) => {
              setFormData((prev) => ({ ...prev, category: v }));
              setFormErrors((prev) => ({ ...prev, category: undefined }));
            }}
          >
            <SelectTrigger
              id="category"
              className="w-full"
              disabled={categoriesLoading}
              aria-invalid={!!formErrors.category}
              aria-describedby={
                formErrors.category ? "category-error" : undefined
              }
            >
              <SelectValue
                placeholder={
                  categoriesLoading
                    ? "Loading categories..."
                    : "Select category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.category && (
            <p
              id="category-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {formErrors.category}
            </p>
          )}
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
