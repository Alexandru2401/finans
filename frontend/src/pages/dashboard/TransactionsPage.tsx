import TransactionsFilters from "@/components/dashboard/transactions/TransactionsFilters";
import TransactionsTable from "@/components/dashboard/transactions/TransactionsTable";

export default function TransactionsPage() {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">Take a look over all your transactions.</p>
      </div>
      <TransactionsFilters />
      <TransactionsTable />
    </section>
  );
}