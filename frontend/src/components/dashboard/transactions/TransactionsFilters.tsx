import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Download, Search, X } from "lucide-react";

const CATEGORIES = ["Sales", "Rent", "SaaS", "Utilities", "Food & Dining", "Shopping", "Other"];

export default function TransactionsFilters() {
    return (
        <>
            {/* SEARCH + EXPORT */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="relative max-w-sm flex-1 min-w-50">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input type="search" id="search-transactions" placeholder="Search description..." className="pl-9" />
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer gap-2">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Export CSV
                </Button>
            </div>

            {/* FILTRE */}
            <div className="flex flex-wrap items-end gap-3 mb-6">
                <div className="flex flex-col gap-1.5 ">
                    <Label htmlFor="filter-year" className="text-xs text-muted-foreground">Year</Label>
                    <Select>
                        <SelectTrigger id="filter-year" className="w-27.5 bg-background border-slate-200 hover:bg-slate-200"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent className="bg-background">
                            <SelectItem value="all" className="cursor-pointer">All years</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-month" className="text-xs text-muted-foreground">Month</Label>
                    <Select>
                        <SelectTrigger id="filter-month" className="w-32.5"><SelectValue placeholder="Month" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All months</SelectItem>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                                <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-day" className="text-xs text-muted-foreground">Day</Label>
                    <Select>
                        <SelectTrigger id="filter-day" className="w-25"><SelectValue placeholder="Day" /></SelectTrigger>
                        <SelectContent className="**:data-radix-select-viewport:max-h-[min(22rem,var(--radix-select-content-available-height))]">
                            <SelectItem value="all">All days</SelectItem>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-type" className="text-xs text-muted-foreground">Type</Label>
                    <Select>
                        <SelectTrigger id="filter-type" className="w-35"><SelectValue placeholder="All types" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-45 justify-between font-normal">
                                <span className="truncate text-muted-foreground">All categories</span>
                                <ChevronDown size={16} className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-55 p-1">
                            <div className="max-h-64 overflow-y-auto">
                                {CATEGORIES.map((cat) => (
                                    <Label key={cat} className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-normal hover:bg-accent">
                                        <Checkbox id={`cat-${cat}`} />
                                        {cat}
                                    </Label>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-min" className="text-xs text-muted-foreground">Amount</Label>
                    <div className="flex items-center gap-1.5">
                        <Input id="filter-min" type="number" placeholder="Min" className="w-22.5" />
                        <span className="text-muted-foreground">–</span>
                        <Input type="number" placeholder="Max" className="w-22.5" aria-label="Maximum amount" />
                    </div>
                </div>

                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <X className="h-4 w-4" aria-hidden="true" />
                    Clear
                </Button>

                <div className="flex flex-col gap-1.5 sm:ml-auto">
                    <Label htmlFor="filter-sort" className="text-xs text-muted-foreground">Sort</Label>
                    <Select>
                        <SelectTrigger id="filter-sort" className="w-45"><SelectValue placeholder="Newest first" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date-desc">Date: newest first</SelectItem>
                            <SelectItem value="date-asc">Date: oldest first</SelectItem>
                            <SelectItem value="amount-desc">Amount: high to low</SelectItem>
                            <SelectItem value="amount-asc">Amount: low to high</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ACTIVE FILTERS */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-muted-foreground">Active:</span>
                <Badge variant="secondary" className="gap-1 pr-1 font-normal">
                    Type: Income
                    <button type="button" aria-label="Remove type filter" className="cursor-pointer rounded-full p-0.5 hover:bg-background/70">
                        <X size={12} />
                    </button>
                </Badge>
                <Badge variant="secondary" className="gap-1 pr-1 font-normal">
                    Category: Sales
                    <button type="button" aria-label="Remove category filter" className="cursor-pointer rounded-full p-0.5 hover:bg-background/70">
                        <X size={12} />
                    </button>
                </Badge>
            </div>
        </>
    );
}