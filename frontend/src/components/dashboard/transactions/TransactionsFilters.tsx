import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Download, Search, X } from "lucide-react";
import type { TransactionFilters } from "./filters";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TYPE_LABELS: Record<string, string> = {
  income: "Income",
  expense: "Expense",
  savings: "Savings",
};

interface Props {
  filters: TransactionFilters;
  onChange: (patch: Partial<TransactionFilters>) => void;
  onClear: () => void;
  years: string[];
  categories: string[];
}

export default function TransactionsFilters({
  filters,
  onChange,
  onClear,
  years,
  categories,
}: Props) {
  const toggleCategory = (cat: string) => {
    const active = filters.categories.includes(cat);
    onChange({
      categories: active
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.year !== "all" ||
    filters.month !== "all" ||
    filters.day !== "all" ||
    filters.type !== "all" ||
    filters.categories.length > 0 ||
    filters.minAmount !== "" ||
    filters.maxAmount !== "";

  return (
    <>
      {/* SEARCH + EXPORT */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative max-w-sm flex-1 min-w-50">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            id="search-transactions"
            placeholder="Search description..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
          />
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer gap-2">
          <Download className="h-4 w-4" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      {/* FILTRE */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="flex flex-col gap-1.5 ">
          <Label
            htmlFor="filter-year"
            className="text-xs text-muted-foreground"
          >
            Year
          </Label>
          <Select
            value={filters.year}
            onValueChange={(v) => onChange({ year: v })}
          >
            <SelectTrigger id="filter-year" className="w-27.5">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">
                All years
              </SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="filter-month"
            className="text-xs text-muted-foreground"
          >
            Month
          </Label>
          <Select
            value={filters.month}
            onValueChange={(v) => onChange({ month: v })}
          >
            <SelectTrigger id="filter-month" className="w-32.5">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {MONTHS.map((m, i) => (
                <SelectItem key={m} value={String(i + 1)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-day" className="text-xs text-muted-foreground">
            Day
          </Label>
          <Select
            value={filters.day}
            onValueChange={(v) => onChange({ day: v })}
          >
            <SelectTrigger id="filter-day" className="w-25">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="**:data-radix-select-viewport:max-h-[min(22rem,var(--radix-select-content-available-height))]">
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
          <Label
            htmlFor="filter-type"
            className="text-xs text-muted-foreground"
          >
            Type
          </Label>
          <Select
            value={filters.type}
            onValueChange={(v) => onChange({ type: v })}
          >
            <SelectTrigger id="filter-type" className="w-35">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-45 justify-between font-normal"
              >
                <span className="truncate text-muted-foreground">
                  {filters.categories.length === 0
                    ? "All categories"
                    : `${filters.categories.length} selected`}
                </span>
                <ChevronDown size={16} className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-55 p-1">
              <div className="max-h-64 overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="px-2 py-1.5 text-sm text-muted-foreground">
                    No categories yet
                  </p>
                ) : (
                  categories.map((cat) => (
                    <Label
                      key={cat}
                      className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-normal hover:bg-accent"
                    >
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={filters.categories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      {cat}
                    </Label>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-min" className="text-xs text-muted-foreground">
            Amount
          </Label>
          <div className="flex items-center gap-1.5">
            <Input
              id="filter-min"
              type="number"
              placeholder="Min"
              className="w-22.5"
              value={filters.minAmount}
              onChange={(e) => onChange({ minAmount: e.target.value })}
            />
            <span className="text-muted-foreground">–</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-22.5"
              aria-label="Maximum amount"
              value={filters.maxAmount}
              onChange={(e) => onChange({ maxAmount: e.target.value })}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Clear
        </Button>

        <div className="flex flex-col gap-1.5 sm:ml-auto">
          <Label
            htmlFor="filter-sort"
            className="text-xs text-muted-foreground"
          >
            Sort
          </Label>
          <Select
            value={filters.sort}
            onValueChange={(v) => onChange({ sort: v })}
          >
            <SelectTrigger id="filter-sort" className="w-45">
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

      {/* ACTIVE FILTERS */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-muted-foreground">Active:</span>

          {filters.search !== "" && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Search: {filters.search}
              <button
                type="button"
                aria-label="Remove search filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ search: "" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}

          {filters.year !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Year: {filters.year}
              <button
                type="button"
                aria-label="Remove year filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ year: "all" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}

          {filters.month !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Month: {MONTHS[Number(filters.month) - 1]}
              <button
                type="button"
                aria-label="Remove month filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ month: "all" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}

          {filters.day !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Day: {filters.day}
              <button
                type="button"
                aria-label="Remove day filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ day: "all" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}

          {filters.type !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Type: {TYPE_LABELS[filters.type]}
              <button
                type="button"
                aria-label="Remove type filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ type: "all" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}

          {filters.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="gap-1 pr-1 font-normal"
            >
              Category: {cat}
              <button
                type="button"
                aria-label={`Remove ${cat} category filter`}
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => toggleCategory(cat)}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}

          {(filters.minAmount !== "" || filters.maxAmount !== "") && (
            <Badge variant="secondary" className="gap-1 pr-1 font-normal">
              Amount: {filters.minAmount || "0"}–{filters.maxAmount || "∞"}
              <button
                type="button"
                aria-label="Remove amount filter"
                className="cursor-pointer rounded-full p-0.5 hover:bg-background/70"
                onClick={() => onChange({ minAmount: "", maxAmount: "" })}
              >
                <X size={12} />
              </button>
            </Badge>
          )}
        </div>
      )}
    </>
  );
}
