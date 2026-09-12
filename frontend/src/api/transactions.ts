import { get } from "./client";

export interface Transaction {
  item_id: string;
  title: string;
  type: "income" | "expense" | "savings";
  amount: number;
  date: string;
  category_name: string;
}

interface TransactionsResponse {
  success: boolean;
  transactions: Transaction[];
}

async function getTransactions() {
  const response = await get<TransactionsResponse>("/transactions");

  return {
    ok: response.ok,
    data: response.ok ? response.data.transactions : null,
  };
}

export { getTransactions };
