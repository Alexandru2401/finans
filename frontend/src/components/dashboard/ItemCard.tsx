import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronDown,
  Plus,
  Minus,
  Pencil,
  Trash2,
  FileText,
  PiggyBank,
  Calendar1,
} from "lucide-react";

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

export default function ItemCard({
  section,
  expanded,
  handleToggle,
  onShowForm,
}) {
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [editValues, setEditValues] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
    notes: "",
  });

  const startEdit = (item) => {
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
    section.onEdit(editingItem.id, {
      amount: parseFloat(editValues.amount),
      category: editValues.category,
      date: editValues.date,
      description: editValues.description,
      notes: editValues.notes,
    });
    setEditingItem(null);
  };

  const startDelete = (item) => setDeletingItem(item);
  const cancelDelete = () => setDeletingItem(null);
  const confirmDelete = () => {
    section.onDelete(deletingItem.id);
    setDeletingItem(null);
  };

  const sectionColor =
    section.section === "income"
      ? "text-green-700"
      : section.section === "savings"
        ? "text-blue-600"
        : "text-red-500";

  const SectionIcon =
    section.section === "income" ? (
      <Plus size={16} className="shrink-0" />
    ) : section.section === "savings" ? (
      <PiggyBank size={16} className="shrink-0" />
    ) : (
      <Minus size={16} className="shrink-0" />
    );

  const categories = CATEGORIES_BY_TYPE[section.section as BudgetType];

  return (
    <>
      <Card>
        <CardHeader className="items-center">
          <div>
            <CardTitle className="flex items-center justify-between gap-2 text-lg">
              {section.title}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(section.section)}
                className="rounded-full cursor-pointer"
              >
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    expanded[section.section] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </CardTitle>
            <CardDescription className="text-xs text-slate-600 font-medium">
              Total: ${section.total.toFixed(2)} · {section.items.length} item
              {section.items.length === 1 ? "" : "s"}
            </CardDescription>
          </div>
        </CardHeader>

        {expanded[section.section] && (
          <CardContent>
            {section.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <p className="text-sm text-slate-600">No entries yet.</p>
                <Button
                  variant="default"
                  onClick={() => onShowForm(true)}
                  className="cursor-pointer"
                >
                  <Plus size={16} />
                  Add entry
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-700/30 px-2 py-2"
                  >
                    <div className="flex items-end gap-3 min-w-0">
                      <div className="flex flex-col min-w-0">
                        <p
                          className={`text-md font-bold flex items-center gap-1 ${sectionColor}`}
                        >
                          {SectionIcon} ${item.amount.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 text-slate-600">
                          <p className="text-sm  font-bold">{item.category}</p>

                          {item.date && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Calendar1 size={12} />
                              <p className="text-xs text-slate-600">
                                {new Date(item.date).toLocaleDateString(
                                  "ro-RO",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0">
                      {/* View details */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingItem(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <FileText size={18} className="text-slate-800" />
                      </Button>
                      {/* Edit */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <Pencil size={16} className="text-blue-700" />
                      </Button>
                      {/* Delete */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startDelete(item)}
                        className="cursor-pointer  hover:bg-slate-400/20"
                      >
                        <Trash2 size={18} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* ── VIEW DETAILS MODAL ── */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setViewingItem(null)}
          />
          <div className="relative z-10 bg-background rounded-xl shadow-2xl border border-muted/30 w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Item details</h2>
                <p className="text-sm text-muted-foreground capitalize">
                  {section.title} entry
                </p>
              </div>
              <span className={`text-2xl font-bold ${sectionColor}`}>
                ${viewingItem.amount.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground mb-0.5">Category</p>
                <p className="font-medium capitalize">{viewingItem.category}</p>
              </div>
              <div className="rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                <p className="font-medium">
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
              <div className="rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Description
                </p>
                <p className="text-sm">{viewingItem.description}</p>
              </div>
            )}

            <div className="rounded-lg bg-muted/40 py-3">
              <p className="text-xs text-muted-foreground mb-1">Notes</p>
              <p className="text-sm whitespace-pre-wrap">
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
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setViewingItem(null);
                  startEdit(viewingItem);
                }}
              >
                <Pencil size={14} className="mr-1" /> Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={cancelEdit} />
          <div className="relative z-10 bg-background rounded-xl shadow-2xl border border-muted/30 w-full max-w-sm mx-4 p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div>
              <h2 className="text-lg font-semibold">Edit item</h2>
              <p className="text-sm text-muted-foreground">
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

            {/* Category — Shadcn Select, dinamic per section */}
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

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                type="text"
                value={editValues.description}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, description: e.target.value }))
                }
                placeholder="e.g. Salary, Rent..."
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={editValues.date}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, date: e.target.value }))
                }
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <textarea
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none min-h-[80px] resize-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={editValues.notes}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, notes: e.target.value }))
                }
                placeholder="Add a note for this item..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button type="button" onClick={confirmEdit}>
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
            className="absolute inset-0 bg-black/40"
            onClick={cancelDelete}
          />
          <div className="relative z-10 bg-background rounded-xl shadow-2xl border border-muted/30 w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-1">
                <Trash2 size={16} className="shrink-0" /> Delete item
              </h2>
              <p className="text-sm text-slate-800 mt-2">
                Are you sure you want to delete{" "}
                <span className="font-medium text-slate-800">
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
    </>
  );
}
