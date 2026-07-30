import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { BudgetSummary } from "@/api/budget";

interface Props {
    summary: BudgetSummary | null;
    loading: boolean;
}

const fmt = (n: number) => `$${n.toLocaleString()}`;

function Change({ pct, negativeIsBad = false }: { pct: number; negativeIsBad?: boolean }) {
    const up = pct >= 0;
    const good = negativeIsBad ? !up : up;
    const Icon = up ? TrendingUp : TrendingDown;
    return (
        <p className={`mt-2 flex items-center gap-1 text-xs ${good ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {Math.abs(pct)}% vs last month
        </p>
    );
}

export default function NetBalance({ summary, loading }: Props) {
    return (
        <Card className="col-span-1 md:col-span-2">
            {loading || !summary ? (
                <div className="flex h-48 items-center justify-center"><Spinner /></div>
            ) : (
                <>
                    <CardHeader>
                        <CardDescription>Total net balance</CardDescription>
                        <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
                            {fmt(summary.netBalance)}
                        </CardTitle>
                        <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="h-4 w-4" aria-hidden="true" />
                            {summary.savingsRate}% net margin
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                            <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/30 sm:min-w-0 sm:shrink">
                                <p className="text-sm text-muted-foreground">Total income</p>
                                <p className="mt-1 text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">{fmt(summary.totalIncome)}</p>
                                <Change pct={summary.incomeChangePct} />
                            </div>

                            <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-red-200 bg-red-50/60 p-4 dark:border-red-900 dark:bg-red-950/30 sm:min-w-0 sm:shrink">
                                <p className="text-sm text-muted-foreground">Total spendings</p>
                                <p className="mt-1 text-lg font-semibold tabular-nums text-red-700 dark:text-red-400">{fmt(summary.totalExpenses)}</p>
                                <Change pct={summary.expensesChangePct} negativeIsBad />
                            </div>

                            <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-[#3874FF]/50 bg-[#3874FF]/20 p-4 dark:border-[#3874FF] dark:bg-violet-950/30 sm:min-w-0 sm:shrink">
                                <p className="text-sm text-muted-foreground">Total savings</p>
                                <p className="mt-1 text-lg font-semibold tabular-nums text-[#3874FF] dark:text-violet-400">{fmt(summary.totalSavings)}</p>
                                <Change pct={summary.savingsChangePct} />
                            </div>
                        </div>
                    </CardContent>
                </>
            )}
        </Card>
    );
}