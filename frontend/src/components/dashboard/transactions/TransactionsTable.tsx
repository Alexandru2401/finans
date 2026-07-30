import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CATEGORY_STYLES: Record<string, string> = {
    Sales: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Rent: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    SaaS: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
};

const ROWS = [
    { desc: "Stripe Payment", cat: "Sales", date: "Jan 24, 2026", amount: "+$1,250", positive: true },
    { desc: "Office Rent", cat: "Rent", date: "Jan 23, 2026", amount: "-$2,000", positive: false },
    { desc: "Software Tools", cat: "SaaS", date: "Jan 22, 2026", amount: "-$320", positive: false },
    { desc: "Client Invoice", cat: "Sales", date: "Jan 21, 2026", amount: "+$4,500", positive: true },
    { desc: "Stripe Payment", cat: "Sales", date: "Jan 24, 2026", amount: "+$1,250", positive: true },
];

export default function TransactionsTable() {
    return (
        <>
            <div className="w-full overflow-x-auto rounded-md border">
                <Table>
                    <TableCaption className="sr-only">A list of your recent transactions.</TableCaption>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                        <TableRow>
                            <TableHead className="min-w-40">Description</TableHead>
                            <TableHead className="min-w-40">Category</TableHead>
                            <TableHead className="min-w-40">Date</TableHead>
                            <TableHead className="min-w-40 text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {ROWS.map((r, i) => (
                            <TableRow key={i} className="cursor-pointer">
                                <TableCell className="font-medium">{r.desc}</TableCell>
                                <TableCell>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_STYLES[r.cat] ?? "bg-slate-100 text-slate-700"}`}>
                                        {r.cat}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground whitespace-nowrap">{r.date}</TableCell>
                                <TableCell className={`text-right font-medium whitespace-nowrap ${r.positive ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
                                    {r.amount}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={4} className="h-32 text-center">
                                <p className="text-sm font-medium">No transactions found</p>
                                <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={3} className="font-medium">Net total</TableCell>
                            <TableCell className="text-right font-semibold whitespace-nowrap text-emerald-700 dark:text-emerald-400">+$4,680</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {/* PAGINATIE */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium text-foreground">1–5</span> of{" "}
                        <span className="font-medium text-foreground">47</span> transactions
                    </p>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="page-size" className="text-xs text-muted-foreground">Per page</Label>
                        <Select>
                            <SelectTrigger id="page-size" className="w-20 h-8"><SelectValue placeholder="10" /></SelectTrigger>
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
                        <PaginationItem><PaginationPrevious href="#" aria-disabled="true" className="pointer-events-none opacity-50" /></PaginationItem>
                        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}