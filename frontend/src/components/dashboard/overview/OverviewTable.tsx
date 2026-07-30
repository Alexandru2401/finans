import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
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

export default function OverviewTable() {
    return <Card className="flex flex-col">
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
                            <TableHead className="min-w-25 text-right">
                                Amount
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                Stripe Payment
                            </TableCell>
                            <TableCell>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                    Sales
                                </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                Jan 24
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                                +$1,250
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">Office Rent</TableCell>
                            <TableCell>
                                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                                    Rent
                                </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                Jan 23
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-red-700 dark:text-red-400">
                                -$2,000
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">
                                Software Tools
                            </TableCell>
                            <TableCell>
                                <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                                    SaaS
                                </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                Jan 22
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-red-700 dark:text-red-400">
                                -$320
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">
                                Client Invoice
                            </TableCell>
                            <TableCell>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                    Sales
                                </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                Jan 21
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                                +$4,500
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">
                                Stripe Payment
                            </TableCell>
                            <TableCell>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                    Sales
                                </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                Jan 24
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                                +$1,250
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
}