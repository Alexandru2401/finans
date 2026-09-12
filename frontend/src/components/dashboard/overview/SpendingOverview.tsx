import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import type { TopExpense } from "@/api/budget";

const CATEGORY_BAR_COLORS = [
  "[&>*]:bg-finance-primary",
  "[&>*]:bg-finance-purple",
  "[&>*]:bg-finance-warning",
  "[&>*]:bg-finance-success",
  "[&>*]:bg-muted-foreground",
];

interface Props {
  items: TopExpense[] | null;
  loading: boolean;
}

export default function SpendingOverview({ items, loading }: Props) {
  const topAmount = items?.[0]?.amount ?? 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              Top Spendings
            </CardTitle>
            <CardDescription>Your biggest expenses this period</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="transactions">See all</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading || !items ? (
          <div className="space-y-3 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3.5 w-12" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No expenses recorded for this period.
          </p>
        ) : (
          <div className="space-y-3 pt-2">
            {items.map((item, i) => (
              <div key={item.item_id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.title}
                    <span className="ml-1 text-xs">({item.category})</span>
                  </span>
                  <span className="font-medium tabular-nums">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={topAmount > 0 ? (item.amount / topAmount) * 100 : 0}
                  className={`h-1.5 ${CATEGORY_BAR_COLORS[i % CATEGORY_BAR_COLORS.length]}`}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
