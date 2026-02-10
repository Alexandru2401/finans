import {
  TrendingDown,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Financial Overview
              </CardTitle>
            </div>
            <CardDescription>
              Your income and savings this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Income
                </p>
                <p className="text-2xl font-bold">$5,200.00</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Savings
                </p>
                <p className="text-2xl font-bold">$1,200.00</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-500" />
            </div>

            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                5% decrease from last month
              </p>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Savings Rate</span>
                <span className="font-semibold">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </CardContent>
        </Card>

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

      {/* Bottom Card - Full Width */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Spending Habits Analysis
            </CardTitle>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
          <CardDescription>
            Insights into your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Highlight */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
              💡 Spending Alert
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Car insurance was your most expensive spending this month at{" "}
              <span className="font-bold">$5,200.00</span>. This is
              significantly higher than usual.
            </p>
          </div>

          {/* Top 5 Spendings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Top 5 Most Expensive Spendings
            </h3>
            <div className="space-y-3">
              {topSpendings.map((spending, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{spending.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {spending.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">
                    ${spending.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$8,000</p>
              <p className="text-sm text-muted-foreground">Budget Limit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$5,200</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">35%</p>
              <p className="text-sm text-muted-foreground">Budget Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
