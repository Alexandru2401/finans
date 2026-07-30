import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TargetsPanelProps {
    targets: { income: number; expenses: number; savings: number };
    onSave: (t: { income: number; expenses: number; savings: number }) => void;
    onClose: () => void;
}

export default function TargetsPanel({ targets, onSave, onClose }: TargetsPanelProps) {
    const [values, setValues] = useState({
        income: String(targets.income),
        expenses: String(targets.expenses),
        savings: String(targets.savings),
    });

    const handleSave = () => {
        onSave({
            income: Number(values.income) || 0,
            expenses: Number(values.expenses) || 0,
            savings: Number(values.savings) || 0,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg rounded-xl border border-muted/30 bg-background p-6 shadow-2xl">
                <h2 className="mb-4 text-lg font-semibold">Set your targets</h2>

                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="t-income" className="text-xs text-muted-foreground">Income target</Label>
                        <Input
                            id="t-income"
                            type="number"
                            value={values.income}
                            onChange={(e) => setValues((v) => ({ ...v, income: e.target.value }))}
                            onKeyDown={(e) => (e.key === "e" || e.key === "E") && e.preventDefault()}
                            className="w-32"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="t-expenses" className="text-xs text-muted-foreground">Expenses limit</Label>
                        <Input
                            id="t-expenses"
                            type="number"
                            value={values.expenses}
                            onChange={(e) => setValues((v) => ({ ...v, expenses: e.target.value }))}
                            onKeyDown={(e) => (e.key === "e" || e.key === "E") && e.preventDefault()}
                            className="w-32"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="t-savings" className="text-xs text-muted-foreground">Savings goal</Label>
                        <Input
                            id="t-savings"
                            type="number"
                            value={values.savings}
                            onChange={(e) => setValues((v) => ({ ...v, savings: e.target.value }))}
                            onKeyDown={(e) => (e.key === "e" || e.key === "E") && e.preventDefault()}
                            className="w-32"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose} className="cursor-pointer">Cancel</Button>
                    <Button onClick={handleSave} className="cursor-pointer">Save targets</Button>
                </div>
            </div>
        </div>
    );
}