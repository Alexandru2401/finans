import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type {
  BudgetItem,
  NewBudgetItem,
} from "@/store/dashboardStore/BudgetStoreContext";
import { format } from "date-fns/format";
import {
  ChevronDownIcon,
  FileText,
  Minus,
  Pencil,
  PiggyBank,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Section } from "../../../pages/dashboard/BudgetPage";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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

interface ItemCardProps {
  section: Section;
  onShowForm: () => void;
}

export default function ItemCard({ section, onShowForm }: ItemCardProps) {
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BudgetItem | null>(null);
  const [viewingItem, setViewingItem] = useState<BudgetItem | null>(null);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [editValues, setEditValues] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
    notes: "",
  });

  const startEdit = (item: BudgetItem) => {
    setEditingItem(item);
    setEditValues({
      amount: item.amount.toFixed(2),
      category: item.category,
      date: item.date?.split("T")[0] ?? "",
      description: item.description ?? "",
      notes: item.notes ?? "",
    });
  };

  const cancelEdit = () => setEditingItem(null);

  const confirmEdit = () => {
    section.onEdit(editingItem!.id, {
      amount: parseFloat(editValues.amount),
      category: editValues.category,
      date: editValues.date,
      description: editValues.description,
      notes: editValues.notes,
    } satisfies Partial<NewBudgetItem>);
    setEditingItem(null);
  };

  const startDelete = (item: BudgetItem) => setDeletingItem(item);
  const cancelDelete = () => setDeletingItem(null);
  const confirmDelete = () => {
    section.onDelete(deletingItem!.id);
    setDeletingItem(null);
  };

  const styles = {
    income: {
      text: "text-finance-success",
      bubble: "bg-finance-success/10 text-finance-success",
      sign: "+",
    },
    expenses: {
      text: "text-finance-danger",
      bubble: "bg-finance-danger/10 text-finance-danger",
      sign: "-",
    },
    savings: {
      text: "text-finance-primary",
      bubble: "bg-finance-primary/10 text-finance-primary",
      sign: "+",
    },
  }[section.section as BudgetType];

  const SectionIcon =
    section.section === "income" ? (
      <Plus size={16} className="shrink-0" />
    ) : section.section === "savings" ? (
      <PiggyBank size={16} className="shrink-0" />
    ) : (
      <Minus size={16} className="shrink-0" />
    );

  const categories = CATEGORIES_BY_TYPE[section.section as BudgetType];

  console.log(section);

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="items-center">
          <div>
            <CardTitle className="flex items-center justify-between gap-2 text-lg text-foreground">
              {section.title}
              <Link to="/dashboard/transactions">
                <Button
                  variant="outline"
                  className="cursor-pointer max-w-34 md:w-auto"
                >
                  See all
                </Button>
              </Link>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-medium">
              Total: ${section.total.toFixed(2)} · {section.items.length} item
              {section.items.length === 1 ? "" : "s"}
            </CardDescription>
          </div>
        </CardHeader>

        {section.section && (
          <CardContent className="overflow-hidden">
            {section.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <p className="text-sm text-muted-foreground">No entries yet.</p>
                <Button
                  variant="default"
                  onClick={() => onShowForm()}
                  className="cursor-pointer"
                >
                  <Plus size={16} />
                  Add entry
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {section.items.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-1.5"
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${styles.bubble}`}
                    >
                      {SectionIcon}
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-sm font-semibold capitalize text-foreground">
                        {item.category}
                      </p>
                      {item.date && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("ro-RO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    <p
                      className={`ml-auto shrink-0 text-sm font-semibold tabular-nums ${styles.text}`}
                    >
                      {styles.sign} ${item.amount.toFixed(2)}
                    </p>

                    <div className="flex shrink-0">
                      {/* View details */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingItem(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <FileText size={18} className="text-finance-warning" />
                      </Button>
                      {/* Edit */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <Pencil size={16} className="text-finance-primary" />
                      </Button>
                      {/* Delete */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startDelete(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <Trash2 size={18} className="text-finance-danger" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}

        {section.items.length > 0 && (
          <CardFooter>
            <Button
              variant="ghost"
              onClick={() => onShowForm()}
              className="cursor-pointer max-w-34 md:w-auto"
            >
              <Plus size={16} />
              Add more items
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* ── VIEW DETAILS MODAL ── */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setViewingItem(null)}
          />
          <div className="relative z-10 flex w-full max-w-sm mx-4 flex-col gap-5 rounded-xl border border-border bg-popover p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Item details
                </h2>
                <p className="text-sm capitalize text-muted-foreground">
                  {section.title} entry
                </p>
              </div>
              <span
                className={`text-2xl font-bold tabular-nums ${
                  section.section === "expenses"
                    ? "text-finance-danger"
                    : "text-finance-success"
                }`}
              >
                ${viewingItem.amount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="mb-0.5 text-xs text-muted-foreground">Category</p>
                <p className="font-medium capitalize text-foreground">
                  {viewingItem.category}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="mb-0.5 text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {viewingItem.date
                    ? new Date(viewingItem.date).toLocaleDateString("ro-RO", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            {viewingItem.description && (
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="mb-0.5 text-xs text-muted-foreground">
                  Description
                </p>
                <p className="text-sm text-foreground">
                  {viewingItem.description}
                </p>
              </div>
            )}

            <div className="rounded-lg bg-muted/40 p-3">
              <p className="mb-1 text-xs text-muted-foreground">Notes</p>
              <p className="max-h-32 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-all text-sm text-foreground">
                {viewingItem.notes?.trim() ? (
                  viewingItem.notes
                ) : (
                  <span className="italic text-muted-foreground">
                    No notes added.
                  </span>
                )}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setViewingItem(null)}
                className="cursor-pointer"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setViewingItem(null);
                  startEdit(viewingItem);
                }}
                className="w-22 cursor-pointer"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cancelEdit}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-md mx-4 flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-popover p-6 shadow-2xl">
            <div>
              <h2 className="flex items-center gap-1 text-lg font-semibold text-foreground">
                <Pencil size={16} className="mr-1 shrink-0" />
                Edit item
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Update the details for this {section.title.toLowerCase()} entry.
              </p>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={editValues.amount}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, amount: e.target.value }))
                }
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editValues.category}
                onValueChange={(v) =>
                  setEditValues((prev) => ({ ...prev, category: v }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <textarea
                className="min-h-20 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={editValues.notes}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, notes: e.target.value }))
                }
                placeholder="Add a note for this item..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={cancelEdit}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmEdit}
                className="cursor-pointer"
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* ── DELETE CONFIRM MODAL ── */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          <div className="relative z-10 flex w-full max-w-sm mx-4 flex-col gap-4 rounded-xl border border-border bg-popover p-4 shadow-2xl">
            <div>
              <h2 className="flex items-center gap-1 text-lg font-semibold text-foreground">
                <Trash2 size={16} className="shrink-0 text-finance-danger" />{" "}
                Delete item
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  {deletingItem.category}
                </span>{" "}
                (${deletingItem.amount.toFixed(2)})? The action cannot be
                undone.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={cancelDelete}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
