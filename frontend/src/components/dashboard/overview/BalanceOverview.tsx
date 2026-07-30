import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { BudgetSummary } from "@/api/budget";

interface Props {
    summary: BudgetSummary | null;
    loading: boolean;
}

const chartConfig = {
    money: { label: "Money" },
    income: { label: "Income", color: "#059669" },
    spendings: { label: "Spendings", color: "#dc2626" },
    savings: { label: "Savings", color: "#3874FF" },
} satisfies ChartConfig;

export default function BalanceOverview({ summary, loading }: Props) {
    if (loading || !summary) {
        return (
            <Card className="flex flex-col items-center justify-center min-h-80">
                <Spinner />
            </Card>
        );
    }

    const chartData = [
        { budgetType: "income", money: summary.totalIncome, fill: "#059669" },
        { budgetType: "spendings", money: summary.totalExpenses, fill: "#dc2626" },
        { budgetType: "savings", money: summary.totalSavings, fill: "#3874FF" },
    ];

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-base">Balance breakdown</CardTitle>
                <CardDescription>Income, spendings and savings</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                    role="img"
                    aria-label="Breakdown of income, spendings and savings"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="money" nameKey="budgetType" />
                        <ChartLegend content={<ChartLegendContent nameKey="budgetType" />} className="flex-wrap gap-2" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <p className="flex items-center gap-1 font-medium">
                    Net margin {summary.savingsRate}%
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                </p>
                <p className="text-muted-foreground">
                    Total net balance: ${summary.netBalance.toLocaleString()}
                </p>
            </CardFooter>
        </Card>
    );
}