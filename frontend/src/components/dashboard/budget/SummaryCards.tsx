import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  PiggyBank,
} from "lucide-react";

interface SummaryProps {
  totalIncome: number;
  incomePct: number;
  budgetTargets: { income: number; expenses: number; savings: number };
  totalExpenses: number;
  expensesPct: number;
  totalSavings: number;
  savingsPct: number;
  netBalance: number;
  savingsRate: number;
}

export default function SummaryCards({
  totalIncome,
  incomePct,
  budgetTargets,
  totalExpenses,
  expensesPct,
  totalSavings,
  savingsPct,
  netBalance,
  savingsRate,
}: SummaryProps) {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
      <Card className="border min-w-[80%] snap-center shrink-0 md:min-w-0 md:shrink">
        <CardHeader>
          <CardTitle className="flex items-center gap-1 text-lg text-foreground">
            <ArrowUpRight className="text-finance-success" /> Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">
            ${totalIncome.toFixed(2)}
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(incomePct)}% of target</span>
              <span>${budgetTargets.income.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-1.5 rounded-full transition-all bg-finance-success`}
                style={{ width: `${incomePct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border min-w-[80%] snap-center shrink-0 md:min-w-0 md:shrink">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <ArrowDownRight className="text-finance-danger" />
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">
            ${totalExpenses.toFixed(2)}
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(expensesPct)}% of limit</span>
              <span>${budgetTargets.expenses.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-1.5 rounded-full transition-all bg-finance-danger"
                style={{ width: `${expensesPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border min-w-[80%] snap-center shrink-0 md:min-w-0 md:shrink">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <PiggyBank className="text-finance-primary" /> Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">
            ${totalSavings.toFixed(2)}
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(savingsPct)}% of goal</span>
              <span>${budgetTargets.savings.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-1.5 rounded-full transition-all bg-finance-primary`}
                style={{ width: `${savingsPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border min-w-[80%] snap-center shrink-0 md:min-w-0 md:shrink">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <DollarSign className="text-finance-purple" /> Net balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">
            ${netBalance.toFixed(2)}
          </p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Net margin</span>
              <span>{Math.round(savingsRate)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-1.5 rounded-full transition-all bg-finance-purple"
                style={{ width: `${Math.abs(savingsRate)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
