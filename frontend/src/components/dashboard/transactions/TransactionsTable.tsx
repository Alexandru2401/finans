import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { Transaction } from "@/api/transactions";

const TYPE_STYLES: Record<Transaction["type"], string> = {
  income: "bg-finance-success-bg text-finance-success",
  expense: "bg-finance-danger-bg text-finance-danger",
  savings: "bg-finance-primary-bg text-finance-primary",
};

const fmtAmount = (amount: number, type: Transaction["type"]) =>
  `${type === "income" ? "+" : "-"}$${Math.abs(amount).toLocaleString()}`;

const fmtDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

interface Props {
  transactions: Transaction[] | null;
  loading: boolean;
}

export default function TransactionsTable({ transactions, loading }: Props) {
  const netTotal =
    transactions?.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
      0,
    ) ?? 0;
  const total = transactions?.length ?? 0;

  return (
    <>
      <div className="w-full overflow-x-auto rounded-md border bg-card">
        <Table>
          <TableCaption className="sr-only">
            A list of your recent transactions.
          </TableCaption>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow>
              <TableHead className="min-w-40">Description</TableHead>
              <TableHead className="min-w-40">Category</TableHead>
              <TableHead className="min-w-40">Date</TableHead>
              <TableHead className="min-w-40 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading || !transactions ? (
              [0, 1, 2, 3, 4].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : transactions.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-32 text-center">
                  <p className="text-sm font-medium">No transactions found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try adjusting your filters or search term.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow key={t.item_id} className="cursor-pointer">
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[t.type]}`}
                    >
                      {t.category_name}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {fmtDate(t.date)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium whitespace-nowrap ${
                      t.type === "income"
                        ? "text-finance-success"
                        : "text-finance-danger"
                    }`}
                  >
                    {fmtAmount(t.amount, t.type)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3} className="font-medium">
                Net total
              </TableCell>
              <TableCell
                className={`text-right font-semibold whitespace-nowrap ${
                  netTotal >= 0 ? "text-finance-success" : "text-finance-danger"
                }`}
              >
                {loading || !transactions
                  ? "—"
                  : `${netTotal >= 0 ? "+" : "-"}$${Math.abs(netTotal).toLocaleString()}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* PAGINATIE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {total === 0 ? 0 : 1}–{total}
            </span>{" "}
            of <span className="font-medium text-foreground">{total}</span>{" "}
            transactions
          </p>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="page-size"
              className="text-xs text-muted-foreground"
            >
              Per page
            </Label>
            <Select>
              <SelectTrigger id="page-size" className="w-20 h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled="true"
                className="pointer-events-none opacity-50"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
