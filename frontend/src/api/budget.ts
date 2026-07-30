export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  date?: string;
  description?: string;
  notes?: string;
}

export type NewBudgetItem = Omit<BudgetItem, "id">;

interface BudgetDataResponse {
  income: BudgetItem[];
  expenses: BudgetItem[];
  savings: BudgetItem[];
}

type Ok<T> = { ok: true; data: T };

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// ── DUMMY DATA ──
const income: BudgetItem[] = [
  {
    id: crypto.randomUUID(),
    category: "Salariu",
    amount: 5000,
    date: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    category: "Investitii",
    amount: 2500,
    date: "2026-06-15T10:30:00.000Z",
  },
  {
    id: crypto.randomUUID(),
    category: "Salariu",
    amount: 5000,
    date: "2026-05-20T10:30:00.000Z",
  },
  {
    id: crypto.randomUUID(),
    category: "Investitii",
    amount: 2500,
    date: "2026-04-10T10:30:00.000Z",
  },
  {
    id: crypto.randomUUID(),
    category: "Salariu",
    amount: 5000,
    date: "2026-03-25T10:30:00.000Z",
  },
];

const expenses: BudgetItem[] = [
  {
    id: crypto.randomUUID(),
    category: "Facturi",
    amount: 530,
    date: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    category: "Chirie",
    amount: 2500,
    date: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    category: "Transport",
    amount: 320,
    date: "2026-05-18T10:30:00.000Z",
  },
];

const savings: BudgetItem[] = [
  {
    id: crypto.randomUUID(),
    category: "Fond urgenta",
    amount: 1000,
    date: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    category: "Vacanta",
    amount: 750,
    date: "2026-04-10T10:30:00.000Z",
  },
];

async function getBudgetData(): Promise<Ok<BudgetDataResponse>> {
  await delay();
  return { ok: true, data: { income, expenses, savings } };
}

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
  getBudgetData,
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
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netBalance: number;
  savingsRate: number;
  incomeChangePct: number;
  expensesChangePct: number;
  savingsChangePct: number;
}

async function getBudgetSummary(
  _period = "last-month",
): Promise<Ok<BudgetSummary>> {
  await delay();

  const totalIncome = 15200;
  const totalExpenses = 3350;
  const totalSavings = 1750;
  const netBalance = totalIncome - totalExpenses;

  return {
    ok: true,
    data: {
      totalIncome,
      totalExpenses,
      totalSavings,
      netBalance,
      savingsRate:
        totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0,
      incomeChangePct: 3.5,
      expensesChangePct: 3.5,
      savingsChangePct: -3.5,
    },
  };
}

export { getBudgetSummary };
