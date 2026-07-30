import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

// culori pentru barele de categorie — doar stilizare
const CATEGORY_BAR_COLORS = [
    "[&>*]:bg-violet-500",
    "[&>*]:bg-sky-500",
    "[&>*]:bg-amber-500",
    "[&>*]:bg-teal-500",
    "[&>*]:bg-slate-400",
];

const spendingByCategory = [
    { category: "Insurance", amount: 5200, percentage: 65 },
    { category: "Food & Dining", amount: 550, percentage: 7 },
    { category: "Shopping", amount: 450, percentage: 6 },
    { category: "Utilities", amount: 150, percentage: 2 },
    { category: "Other", amount: 1450, percentage: 20 },
];

export default function SpendingOverview() {
    return <Card className="flex flex-col">
        <CardHeader>
            <div className="flex items-start justify-between gap-2">
                <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                        Spendings Overview
                    </CardTitle>
                    <CardDescription>Your expenses this period</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link to="transactions">See all</Link>
                </Button>
            </div>
        </CardHeader>

        <CardContent className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950">
                <TrendingUp
                    className="h-5 w-5 shrink-0 text-orange-500"
                    aria-hidden="true"
                />
                <p className="text-xs font-medium text-orange-700 dark:text-orange-400">
                    12% increase from last month
                </p>
            </div>

            <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold">Spending by Category</p>
                {spendingByCategory.map((item, i) => (
                    <div key={item.category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                {item.category}
                            </span>
                            <span className="font-medium tabular-nums">
                                ${item.amount.toLocaleString()}
                            </span>
                        </div>
                        <Progress
                            value={item.percentage}
                            className={`h-1.5 ${CATEGORY_BAR_COLORS[i % CATEGORY_BAR_COLORS.length]}`}
                        />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
}