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
  ChevronDown,
  Plus,
  Minus,
  Pencil,
  Trash2,
  PiggyBank,
  Calendar1,
} from "lucide-react";

export default function ItemCard({ section, expanded, handleToggle }) {
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [editValues, setEditValues] = useState({
    amount: "",
    category: "",
    date: "",
  });

  const startEdit = (item) => {
    setEditingItem(item);
    setEditValues({
      amount: item.amount.toFixed(2),
      category: item.category,
      date: item.date?.split("T")[0] ?? "",
    });
  };

  const cancelEdit = () => setEditingItem(null);

  const confirmEdit = () => {
    section.onEdit(editingItem.id, {
      amount: parseFloat(editValues.amount),
      category: editValues.category,
      date: editValues.date,
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

  return (
    <>
      <Card key={section.title}>
        <CardHeader className="items-center">
          <div>
            <CardTitle className="flex items-center justify-between gap-2 text-lg">
              {section.title}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(section.section)}
                className="rounded-full"
              >
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    expanded[section.section] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </CardTitle>
            <CardDescription>
              Total: ${section.total.toFixed(2)} · {section.items.length} item
              {section.items.length === 1 ? "" : "s"}
            </CardDescription>
          </div>
        </CardHeader>

        {expanded[section.section] ? (
          <CardContent>
            {section.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No entries yet.</p>
            ) : (
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-700/30 px-2 py-2"
                  >
                    <div className="flex items-end gap-3">
                      <div className="flex flex-col">
                        <p
                          className={`text-md font-bold flex items-center ${sectionColor}`}
                        >
                          {SectionIcon} ${item.amount.toFixed(2)}
                        </p>
                        <p className="text-sm">{item.category}</p>
                      </div>
                      {item.date && (
                        <div className="flex items-center gap-1">
                          <Calendar1 size={12} />
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString("ro-RO", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item)}
                        className="cursor-pointer bg-slate-400/10 hover:bg-slate-400/20"
                      >
                        <Pencil size={16} className="text-blue-700" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startDelete(item)}
                        className="cursor-pointer bg-slate-400/10 hover:bg-slate-400/20"
                      >
                        <Trash2 size={18} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        ) : null}

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Add a new {section.title.toLowerCase()} item to fill this section.
          </p>
        </CardFooter>
      </Card>

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={cancelEdit} />
          <div className="relative z-10 bg-background rounded-xl shadow-2xl border border-muted/30 w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold">Edit item</h2>
              <p className="text-sm text-muted-foreground">
                Update the details for this {section.title.toLowerCase()} entry.
              </p>
            </div>

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

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                type="text"
                value={editValues.category}
                onChange={(e) =>
                  setEditValues((v) => ({ ...v, category: e.target.value }))
                }
                placeholder="e.g. Salary, Rent..."
              />
            </div>

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
              <h2 className="text-lg font-semibold">Delete item</h2>
              <p className="text-sm text-muted-foreground">
                Ești sigur că vrei să ștergi{" "}
                <span className="font-medium text-foreground">
                  {deletingItem.category}
                </span>{" "}
                (${deletingItem.amount.toFixed(2)})? Acțiunea nu poate fi
                anulată.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
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
