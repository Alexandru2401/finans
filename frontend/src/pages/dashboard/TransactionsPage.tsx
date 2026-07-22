import { Search, X } from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TransactionsPage() {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Take a look over all your transactions.
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4 max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          id="search-transactions"
          placeholder="Search description..."
          className="pl-9"
        />
      </div>

      {/* FILTRE */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-year" className="text-xs text-muted-foreground">
            Year
          </Label>
          <Select>
            <SelectTrigger id="filter-year" className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-month" className="text-xs text-muted-foreground">
            Month
          </Label>
          <Select>
            <SelectTrigger id="filter-month" className="w-[130px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-day" className="text-xs text-muted-foreground">
            Day
          </Label>
          <Select>
            <SelectTrigger id="filter-day" className="w-[100px]">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="[&_[data-radix-select-viewport]]:max-h-[min(22rem,var(--radix-select-content-available-height))]">
              <SelectItem value="all">All days</SelectItem>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-type" className="text-xs text-muted-foreground">
            Type
          </Label>
          <Select>
            <SelectTrigger id="filter-type" className="w-[140px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <X className="h-4 w-4" aria-hidden="true" />
          Clear
        </Button>

        <div className="flex flex-col gap-1.5 sm:ml-auto">
          <Label htmlFor="filter-sort" className="text-xs text-muted-foreground">
            Sort
          </Label>
          <Select>
            <SelectTrigger id="filter-sort" className="w-[180px]">
              <SelectValue placeholder="Newest first" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date: newest first</SelectItem>
              <SelectItem value="date-asc">Date: oldest first</SelectItem>
              <SelectItem value="amount-desc">Amount: high to low</SelectItem>
              <SelectItem value="amount-asc">Amount: low to high</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TABEL */}
      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableCaption className="sr-only">
            A list of your recent transactions.
          </TableCaption>

          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead className="min-w-[160px]">Description</TableHead>
              <TableHead className="min-w-[110px]">Category</TableHead>
              <TableHead className="min-w-[110px]">Date</TableHead>
              <TableHead className="min-w-[110px] text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">Stripe Payment</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Sales
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                Jan 24, 2026
              </TableCell>
              <TableCell className="text-right font-medium whitespace-nowrap text-emerald-700 dark:text-emerald-400">
                +$1,250
              </TableCell>
            </TableRow>

            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">Office Rent</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                  Rent
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                Jan 23, 2026
              </TableCell>
              <TableCell className="text-right font-medium whitespace-nowrap text-red-700 dark:text-red-400">
                -$2,000
              </TableCell>
            </TableRow>

            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">Software Tools</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                  SaaS
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                Jan 22, 2026
              </TableCell>
              <TableCell className="text-right font-medium whitespace-nowrap text-red-700 dark:text-red-400">
                -$320
              </TableCell>
            </TableRow>

            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">Client Invoice</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Sales
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                Jan 21, 2026
              </TableCell>
              <TableCell className="text-right font-medium whitespace-nowrap text-emerald-700 dark:text-emerald-400">
                +$4,500
              </TableCell>
            </TableRow>

            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">Stripe Payment</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Sales
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                Jan 24, 2026
              </TableCell>
              <TableCell className="text-right font-medium whitespace-nowrap text-emerald-700 dark:text-emerald-400">
                +$1,250
              </TableCell>
            </TableRow>

            {/* EMPTY STATE — se randeaza in locul randurilor de mai sus cand nu exista rezultate
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4} className="h-32 text-center">
                <p className="text-sm font-medium">No transactions found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your filters or search term.
                </p>
              </TableCell>
            </TableRow>
            */}
          </TableBody>

          <TableFooter>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3} className="font-medium">
                Net total
              </TableCell>
              <TableCell className="text-right font-semibold whitespace-nowrap text-emerald-700 dark:text-emerald-400">
                +$4,680
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* PAGINATIE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">1–5</span> of{" "}
          <span className="font-medium text-foreground">47</span> transactions
        </p>

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
    </section>
  )
}