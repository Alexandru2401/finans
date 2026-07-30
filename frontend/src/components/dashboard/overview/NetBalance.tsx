import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export const description = "A simple pie chart";

export default function NetBalance() {
    return <Card className="col-span-1 md:col-span-2">
        <CardHeader>
            <CardDescription>Total net balance</CardDescription>
            <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
                $5,200
            </CardTitle>
            <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                3.5% vs last month
            </p>
        </CardHeader>

        <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <p className="text-sm text-muted-foreground">Total income</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                        $5,200
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                        3.5% vs last month
                    </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50/60 p-4 dark:border-red-900 dark:bg-red-950/30">
                    <p className="text-sm text-muted-foreground">Total spendings</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-red-700 dark:text-red-400">
                        $5,200
                    </p>
                    {/* crestere la cheltuieli = semnal negativ */}
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                        3.5% vs last month
                    </p>
                </div>

                <div className="rounded-lg border border-[#3874FF]/50 bg-[#3874FF]/20 p-4 dark:border-[#3874FF] dark:bg-violet-950/30">
                    <p className="text-sm text-muted-foreground">Total savings</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-[#3874FF] dark:text-violet-400">
                        $5,200
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                        3.5% vs last month
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
}