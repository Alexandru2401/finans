import { createContext, useContext, useState } from "react";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

interface BudgetStoreContextType {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  savingsItems: BudgetItem[];

  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;

  addIncomeItem: (category: string, amount: number) => void;
  updateIncomeItem: (id: string, amount: number) => void;
  deleteIncomeItem: (id: string) => void;

  addExpenseItem: (category: string, amount: number) => void;
  updateExpenseItem: (id: string, amount: number) => void;
  deleteExpenseItem: (id: string) => void;

  addSavingsItem: (category: string, amount: number) => void;
  updateSavingsItem: (id: string, amount: number) => void;
  deleteSavingsItem: (id: string) => void;
}

const BudgetStoreContext = createContext<BudgetStoreContextType | undefined>(
  undefined,
);

export function BudgetStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [incomeItems, setIncomeItems] = useState<BudgetItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<BudgetItem[]>([]);
  const [savingsItems, setSavingsItems] = useState<BudgetItem[]>([]);

  const totalIncome: number = incomeItems.reduce(
    (total, acc) => total + acc.amount,
    0,
  );
  const totalExpenses: number = expenseItems.reduce(
    (total, acc) => total + acc.amount,
    0,
  );
  const totalSavings: number = savingsItems.reduce(
    (total, acc) => total + acc.amount,
    0,
  );

  function addIncomeItem(category: string, amount: number) {
    setIncomeItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category,
        amount,
      },
    ]);
  }

  function updateIncomeItem(id: string, amount: number) {
    setIncomeItems((prevItem) =>
      prevItem.map((item) => (item.id === id ? { ...item, amount } : item)),
    );
  }

  function deleteIncomeItem(id: string) {
    setIncomeItems((prevItem) => prevItem.filter((item) => item.id !== id));
  }

  function addExpenseItem(category: string, amount: number) {
    setExpenseItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category,
        amount,
      },
    ]);
  }

  function updateExpenseItem(id: string, amount: number) {
    setExpenseItems((prevItem) =>
      prevItem.map((item) => (item.id === id ? { ...item, amount } : item)),
    );
  }

  function deleteExpenseItem(id: string) {
    setExpenseItems((prevItem) => prevItem.filter((item) => item.id !== id));
  }

  function addSavingsItem(category: string, amount: number) {
    setSavingsItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category,
        amount,
      },
    ]);
  }

  function updateSavingsItem(id: string, amount: number) {
    setSavingsItems((prevItem) =>
      prevItem.map((item) => (item.id === id ? { ...item, amount } : item)),
    );
  }

  function deleteSavingsItem(id: string) {
    setSavingsItems((prevItem) => prevItem.filter((item) => item.id !== id));
  }

  return (
    <BudgetStoreContext.Provider
      value={{
        incomeItems,
        expenseItems,
        savingsItems,
        totalIncome,
        totalExpenses,
        totalSavings,
        addIncomeItem,
        updateIncomeItem,
        deleteIncomeItem,
        addExpenseItem,
        updateExpenseItem,
        deleteExpenseItem,
        addSavingsItem,
        updateSavingsItem,
        deleteSavingsItem,
      }}
    >
      {children}
    </BudgetStoreContext.Provider>
  );
}

export function useBudgetStore() {
  const context = useContext(BudgetStoreContext);
  if (!context) {
    throw new Error("useBudgetStore must be used within BudgetStoreProvider");
  }
  return context;
}

export { BudgetStoreContext };
console.log("BudgetStoreContext Created:", BudgetStoreContext);
