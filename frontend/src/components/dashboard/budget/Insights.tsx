
import {
    Calendar,
    Home,
    Lightbulb,
    PiggyBank,
    Target,
    TrendingUp
} from "lucide-react";

const insights = [
    {
        icon: <Target className="h-4 w-4" />,
        tone: "bg-emerald-50 text-emerald-700",
        label: "You're doing great!",
        value: `You've saved 222% of your goal this month.`,
    },
    {
        icon: <Home className="h-4 w-4" />,
        tone: "bg-red-50 text-red-700",
        label: "Top expense",
        value: "1000"
    },
    {
        icon: <TrendingUp className="h-4 w-4" />,
        tone: "bg-emerald-50 text-emerald-700",
        label: "Income trend",
        value: "50% vs last month",
    },
    {
        icon: <PiggyBank className="h-4 w-4" />,
        tone: "bg-blue-50 text-blue-700",
        label: "Savings rate",
        value: `15% of income`,
    },
    {
        icon: <Calendar className="h-4 w-4" />,
        tone: "bg-violet-50 text-violet-700",
        label: "Days left in period",
        value: `2 days`,
    },
];

export default function Insights() {
    return <div className="rounded-xl border bg-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="h-4 w-4" style={{ color: "#ffd649" }} />
            Insights
        </div>
        <div className="flex flex-col gap-2">
            {insights.map((i) => (
                <div key={i.label} className="flex items-start gap-2 rounded-lg border p-3">
                    <span className={`rounded-md p-1.5 ${i.tone}`}>{i.icon}</span>
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{i.label}</p>
                        <p className="truncate text-sm font-medium">{i.value}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
}