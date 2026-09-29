import { del, get, patch, post } from "./client";
import type { BudgetItemPayload } from "@/schemas/budget-item.schema";

export interface BudgetItem {
  id: string;
  type: "income" | "expenses" | "savings";
  category: string;
  categoryId?: string;
  amount: number;
  date?: string;
  notes?: string;
}

type BudgetType = "income" | "expenses" | "savings";

// The backend uses "expense" (singular); the frontend uses "expenses"
type ApiBudgetType = "income" | "expense" | "savings";

const toApiType = (type: BudgetType): ApiBudgetType =>
  type === "expenses" ? "expense" : type;

const fromApiType = (type: ApiBudgetType): BudgetType =>
  type === "expense" ? "expenses" : type;

export interface Category {
  category_id: string;
  type: BudgetType;
  name: string;
  key: string | null; // null pentru categoriile custom
}

type ApiCategory = Omit<Category, "type"> & { type: ApiBudgetType };

const fromApiCategory = (category: ApiCategory): Category => ({
  ...category,
  type: fromApiType(category.type),
});

interface CategoriesResponse {
  success: boolean;
  categories: ApiCategory[];
}

interface CategoryResponse {
  success: boolean;
  category: ApiCategory;
  message?: string;
}
export type NewBudgetItem = Omit<BudgetItem, "id">;

async function getCategories(type?: BudgetType): Promise<Category[]> {
  const query = type ? `?type=${toApiType(type)}` : "";
  const response = await get<CategoriesResponse>(`/budget/categories${query}`);
  if (!response.ok) throw new Error("Could not load categories");
  return response.data.categories.map(fromApiCategory);
}

async function createCategory(payload: {
  type: BudgetType;
  name: string;
}): Promise<Category> {
  const response = await post<CategoryResponse>("/budget/categories", {
    ...payload,
    type: toApiType(payload.type),
  });
  if (!response.ok) {
    throw new Error(response.data?.message ?? "Could not create category");
  }
  return fromApiCategory(response.data.category);
}

async function addNewTransaction(item: BudgetItemPayload): Promise<void> {
  const response = await post<{ message?: string }>("/transactions", {
    type: toApiType(item.type),
    category_id: item.category,
    amount: item.amount,
    date: item.date,
    ...(item.notes && { notes: item.notes }),
  });
  if (!response.ok) {
    throw new Error(response.data?.message ?? "Could not add new transaction");
  }
}

export interface UpdateTransactionPayload {
  amount?: number;
  date?: string;
  category_id?: string;
  // null or "" clears the note
  notes?: string | null;
}

// Errors come as { message } (4xx) or { error } (500)
type ApiError = { message?: string; error?: string } | null;

async function updateTransaction(
  id: string,
  payload: UpdateTransactionPayload,
): Promise<void> {
  const response = await patch<ApiError>(`/transactions/${id}`, payload);
  if (!response.ok) {
    throw new Error(
      response.data?.message ??
        response.data?.error ??
        "Could not update transaction",
    );
  }
}

async function deleteTransaction(id: string): Promise<void> {
  const response = await del<ApiError>(`/transactions/${id}`);
  if (!response.ok) {
    throw new Error(
      response.data?.message ??
        response.data?.error ??
        "Could not delete transaction",
    );
  }
}

export {
  getCategories,
  createCategory,
  addNewTransaction,
  updateTransaction,
  deleteTransaction,
};

export interface BudgetSummary {
  income: number;
  expense: number;
  savings: number;
  net: number;
}

interface BudgetSummaryResponse {
  success: boolean;
  summary: BudgetSummary;
}

async function getBudgetSummary(period = "last-month") {
  const response = await get<BudgetSummaryResponse>(
    `/budget/summary?period=${period}`,
  );

  return {
    ok: response.ok,
    data: response.ok ? response.data.summary : null,
  };
}

export { getBudgetSummary };

export interface TopExpense {
  item_id: string;
  category_id: string | null;
  category: string | null;
  amount: number;
  date: string;
  notes: string | null;
  created_at: string;
}

interface TopExpensesResponse {
  success: boolean;
  topExpenses: (Omit<TopExpense, "amount"> & { amount: string })[];
}

async function getTopExpenses(period = "last-month") {
  const response = await get<TopExpensesResponse>(
    `/budget/spending/top?period=${period}`,
  );

  return {
    ok: response.ok,
    data: response.ok
      ? response.data.topExpenses.map((item) => ({
          ...item,
          amount: parseFloat(item.amount),
        }))
      : null,
  };
}

export { getTopExpenses };

export interface BudgetTrendPoint {
  month: string;
  income: number;
  expense: number;
}

interface BudgetTrendResponse {
  success: boolean;
  trend: BudgetTrendPoint[];
}

async function getBudgetTrend() {
  const response = await get<BudgetTrendResponse>("/budget/budget-trend");

  return {
    ok: response.ok,
    data: response.ok ? response.data.trend : null,
  };
}

export { getBudgetTrend };
