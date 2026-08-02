import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";

const CATEGORY_STYLES: Record<string, string> = {
  Sales: "bg-finance-success-bg text-finance-success",
  Rent: "bg-finance-warning-bg text-finance-warning",
  SaaS: "bg-finance-danger-bg text-finance-danger",
};

const transactions = [
  { desc: "Stripe Payment", category: "Sales", date: "Jan 24", amount: 1250 },
  { desc: "Office Rent", category: "Rent", date: "Jan 23", amount: -2000 },
  { desc: "Software Tools", category: "SaaS", date: "Jan 22", amount: -320 },
  { desc: "Client Invoice", category: "Sales", date: "Jan 21", amount: 4500 },
  { desc: "Stripe Payment", category: "Sales", date: "Jan 24", amount: 1250 },
];

const fmt = (n: number) =>
  `${n >= 0 ? "+" : "-"}$${Math.abs(n).toLocaleString()}`;

export default function OverviewTable() {
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
              {transactions.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{t.desc}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        CATEGORY_STYLES[t.category] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t.category}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {t.date}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap text-right font-medium tabular-nums ${
                      t.amount >= 0
                        ? "text-finance-success"
                        : "text-finance-danger"
                    }`}
                  >
                    {fmt(t.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
