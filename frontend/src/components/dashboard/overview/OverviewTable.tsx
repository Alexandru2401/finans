import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import type { Transaction } from "@/api/transactions";

const TYPE_STYLES: Record<Transaction["type"], string> = {
  income: "bg-finance-success-bg text-finance-success",
  expense: "bg-finance-danger-bg text-finance-danger",
  savings: "bg-finance-primary-bg text-finance-primary",
};

const fmt = (n: number, type: Transaction["type"]) =>
  `${type === "income" ? "+" : "-"}$${Math.abs(n).toLocaleString()}`;

const fmtDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

interface Props {
  transactions: Transaction[] | null;
  loading: boolean;
}

export default function OverviewTable({ transactions, loading }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <CardDescription>
              Your latest financial transactions.
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="transactions">See all</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {loading || !transactions ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions recorded yet.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-35">Description</TableHead>
                  <TableHead className="min-w-25">Category</TableHead>
                  <TableHead className="min-w-22.5">Date</TableHead>
                  <TableHead className="min-w-25 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.item_id}>
                    <TableCell className="font-medium">{t.title}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[t.type]}`}
                      >
                        {t.category_name}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {fmtDate(t.date)}
                    </TableCell>
                    <TableCell
                      className={`whitespace-nowrap text-right font-medium tabular-nums ${
                        t.type === "income"
                          ? "text-finance-success"
                          : "text-finance-danger"
                      }`}
                    >
                      {fmt(t.amount, t.type)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
