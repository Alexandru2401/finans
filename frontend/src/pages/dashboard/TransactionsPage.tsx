import TransactionsFilters from "@/components/dashboard/transactions/TransactionsFilters";
import TransactionsTable from "@/components/dashboard/transactions/TransactionsTable";
import PageHeader from "@/components/dashboard/shared/PageHeader";

export default function TransactionsPage() {
  return (
    <section className="px-4 py-4 max-w-7xl mx-auto">
      <PageHeader
        title="Transactions"
        subtitle="Take a look over all your transactions."
      />
      <TransactionsFilters />
      <TransactionsTable />
    </section>
  );
}
