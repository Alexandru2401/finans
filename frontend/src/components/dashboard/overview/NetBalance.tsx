import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import type { BudgetSummary } from "@/api/budget";

interface Props {
  summary: BudgetSummary | null;
  loading: boolean;
}

const fmt = (n: number) => `$${n.toLocaleString()}`;

function NetBalanceSkeleton() {
  return (
    <>
      <CardHeader>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-2 h-10 w-40" />
        <Skeleton className="mt-2 h-3 w-24" />
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="min-w-[80%] snap-center shrink-0 rounded-lg border border-border bg-accent/50 p-4 sm:min-w-0 sm:shrink"
            >
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="mt-2 h-5 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}

export default function NetBalance({ summary, loading }: Props) {
  return (
    <Card className="col-span-1 md:col-span-2 ">
      {loading || !summary ? (
        <NetBalanceSkeleton />
      ) : (
        <>
          <CardHeader>
            <CardDescription>Total net balance</CardDescription>
            <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
              {fmt(summary.net)}
            </CardTitle>
            <p className="flex items-center gap-1 text-xs text-finance-success">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              {summary.income > 0
                ? Math.round((summary.net / summary.income) * 100)
                : 0}
              % net margin
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
              <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-border bg-accent/50 p-4 sm:min-w-0 sm:shrink">
                <p className="text-sm">Total income</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-finance-success">
                  {fmt(summary.income)}
                </p>
              </div>

              <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-border bg-accent/50 p-4 sm:min-w-0 sm:shrink">
                <p className="text-sm">Total spendings</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-finance-danger">
                  {fmt(summary.expense)}
                </p>
              </div>

              <div className="min-w-[80%] snap-center shrink-0 rounded-lg border border-border bg-accent/50 p-4 sm:min-w-0 sm:shrink">
                <p className="text-sm">Total savings</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-finance-primary">
                  {fmt(summary.savings)}
                </p>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
