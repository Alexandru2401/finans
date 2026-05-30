import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreditCard, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
export const description = "A simple pie chart";

const chartData = [
  { budgetType: "income", money: 275, fill: "#059669" },
  { budgetType: "spendings", money: 200, fill: "#dc2626" },
  { budgetType: "savings", money: 187, fill: "#7c3aed" },
];

const chartConfig = {
  money: { label: "Money" },
  income: { label: "Income", color: "#059669" },
  spendings: { label: "Spendings", color: "#dc2626" },
  savings: { label: "Savings", color: "#7c3aed" },
} satisfies ChartConfig;

export default function DashboardHomePage() {
  const topSpendings = [
    { name: "Car insurance", amount: 5200.0, category: "Insurance" },
    { name: "Electricity bill", amount: 150.0, category: "Utilities" },
    { name: "Groceries", amount: 300.0, category: "Food" },
    { name: "Restaurant meals", amount: 250.0, category: "Dining" },
    { name: "Shopping", amount: 450.0, category: "Retail" },
  ];

  const spendingByCategory = [
    { category: "Insurance", amount: 5200, percentage: 65 },
    { category: "Food & Dining", amount: 550, percentage: 7 },
    { category: "Shopping", amount: 450, percentage: 6 },
    { category: "Utilities", amount: 150, percentage: 2 },
    { category: "Other", amount: 1450, percentage: 20 },
  ];

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, User! 👋</h1>
        <p className="text-muted-foreground text-lg">
          Take a look over your financial dashboard
        </p>
      </div>

      {/* Top Cards Grid - 2 columns */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Financial Overview Card */}
        <div className="flex flex-col justify-between gap-4 bg-blue-100 p-2 rounded-2xl">
          <div>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-lg">
                  Total net balance
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xl font-semibold text-green-700">$ 5,200</p>

                <div className="flex justify-between text-xs text-slate-500">
                  <span>
                    <TrendingUp className="h-4 w-4 inline mr-1" /> 3.5 % vs last
                    month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col  gap-4 md:flex-row bg-white p-4 rounded-3xl">
            {" "}
            <Card className="border border-green-200 bg-green-50/60 w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-sm">
                  Total incoming money
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xl font-semibold text-green-700">$ 5,200</p>

                <div className="flex justify-between text-xs text-slate-500 mt-3 space-y-1">
                  <span>
                    <TrendingUp className="h-4 w-4 inline mr-1" /> 3.5 % vs last
                    month
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-green-200 bg-red-50/60 w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-sm">
                  Total incoming money
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xl font-semibold text-red-700">$ 5,200</p>

                <div className="flex justify-between text-xs text-slate-500 mt-3 space-y-1">
                  <span>
                    <TrendingUp className="h-4 w-4 inline mr-1" /> 3.5 % vs last
                    month
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-green-200 bg-blue-50/60 w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-sm">
                  Total incoming money
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xl font-semibold text-blue-700">$ 5,200</p>

                <div className="flex justify-between text-xs text-slate-500 mt-3 space-y-1">
                  <span>
                    <TrendingUp className="h-4 w-4 inline mr-1" /> 3.5 % vs last
                    month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Spendings Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Spendings Overview
              </CardTitle>
            </div>
            <CardDescription>Your expenses this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Spent
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  $2,800.00
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-red-500" />
            </div>

            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
                12% increase from last month
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold">Spending by Category</p>
              {spendingByCategory.slice(0, 3).map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.category}
                    </span>
                    <span className="font-medium">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-62.5"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie data={chartData} dataKey="money" nameKey="budgetType" />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Total net balance: $2500
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="bg-white shadow-sm p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="px-2 text-lg">Recent Transactions</h2>
              <p className="text-sm p-2 text-muted-foreground">
                Here are your latest financial transactions.
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-2 mb-4">
              See all
            </Button>
          </div>
          <table className="w-full border-collapse text-sm mt-2">
            <thead className="bg-slate-200">
              <tr className="border-b border-slate-200">
                <th className="text-left font-medium text-slate-500 text-xs p-3">
                  Description
                </th>
                <th className="text-left font-medium text-slate-500 text-xs p-3">
                  Category
                </th>
                <th className="text-left font-medium text-slate-500 text-xs p-3">
                  Date
                </th>
                <th className="text-right font-medium text-slate-500 text-xs p-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3">Stripe Payment</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    Sales
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500">Jan 24</td>
                <td className="py-3 px-3 text-right font-medium text-emerald-700">
                  +$1,250
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3">Office Rent</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                    Rent
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500">Jan 23</td>
                <td className="py-3 px-3 text-right font-medium text-red-700">
                  -$2,000
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3">Software Tools</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                    SaaS
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500">Jan 22</td>
                <td className="py-3 px-3 text-right font-medium text-red-700">
                  -$320
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3">Client Invoice</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    Sales
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500">Jan 21</td>
                <td className="py-3 px-3 text-right font-medium text-emerald-700">
                  +$4,500
                </td>
              </tr>
              <tr className="last:border-0">
                <td className="py-3 px-3">Stripe Payment</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    Sales
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500">Jan 24</td>
                <td className="py-3 px-3 text-right font-medium text-emerald-700">
                  +$1,250
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Card - Full Width */}
    </section>
  );
}
