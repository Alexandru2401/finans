import { get } from "./client";

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  date?: string;
  description?: string;
  notes?: string;
}

export type NewBudgetItem = Omit<BudgetItem, "id">;

type Ok<T> = { ok: true; data: T };

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// ── INCOME ──
async function addIncomeItem(payload: NewBudgetItem): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id: crypto.randomUUID(), ...payload } };
}

async function editIncomeItem(
  id: string,
  payload: Partial<NewBudgetItem>,
): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id, category: "", amount: 0, ...payload } };
}

async function deleteIncomeItem(_id: string): Promise<Ok<{ success: boolean }>> {
  await delay();
  return { ok: true, data: { success: true } };
}

// ── EXPENSES ──
async function addExpenseItem(payload: NewBudgetItem): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id: crypto.randomUUID(), ...payload } };
}

async function editExpenseItem(
  id: string,
  payload: Partial<NewBudgetItem>,
): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id, category: "", amount: 0, ...payload } };
}

async function deleteExpenseItem(
  _id: string,
): Promise<Ok<{ success: boolean }>> {
  await delay();
  return { ok: true, data: { success: true } };
}

// ── SAVINGS ──
async function addSavingsItem(payload: NewBudgetItem): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id: crypto.randomUUID(), ...payload } };
}

async function editSavingsItem(
  id: string,
  payload: Partial<NewBudgetItem>,
): Promise<Ok<BudgetItem>> {
  await delay();
  return { ok: true, data: { id, category: "", amount: 0, ...payload } };
}

async function deleteSavingsItem(
  _id: string,
): Promise<Ok<{ success: boolean }>> {
  await delay();
  return { ok: true, data: { success: true } };
}

export {
  addIncomeItem,
  editIncomeItem,
  deleteIncomeItem,
  addExpenseItem,
  editExpenseItem,
  deleteExpenseItem,
  addSavingsItem,
  editSavingsItem,
  deleteSavingsItem,
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
  category_id: string;
  category: string;
  title: string;
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
