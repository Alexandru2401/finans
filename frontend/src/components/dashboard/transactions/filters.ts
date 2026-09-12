export interface TransactionFilters {
  search: string;
  year: string;
  month: string;
  day: string;
  type: string;
  categories: string[];
  minAmount: string;
  maxAmount: string;
  sort: string;
}

export const DEFAULT_FILTERS: TransactionFilters = {
  search: "",
  year: "all",
  month: "all",
  day: "all",
  type: "all",
  categories: [],
  minAmount: "",
  maxAmount: "",
  sort: "date-desc",
};
