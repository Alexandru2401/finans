import {
    Info,
    Lightbulb
} from "lucide-react";


const tips = [
    {
        icon: "🍽️",
        action: "Reduce restaurantele cu 30%",
        impact: "+$360/lună economisit",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        border: "border-emerald-200 dark:border-emerald-900",
    },
    {
        icon: "🛍️",
        action: "Limitează shoppingul la $200",
        impact: "+$100/lună economisit",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-900",
    },
    {
        icon: "📱",
        action: "Auditează subscripțiile inactive",
        impact: "~$40/lună economisit",
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-950/30",
        border: "border-violet-200 dark:border-violet-900",
    },
];


export default function AnalyticsInsight() {
    return <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">
            <Info
                size={16}
                className="mt-0.5 shrink-0 text-blue-500"
                aria-hidden="true"
            />
            <p className="text-sm leading-relaxed">
                Analizând cheltuielile din ultimele 6 luni, se pare că în următoarele
                6 luni cheltuielile vor crește cu aproximativ{" "}
                <span className="font-semibold">15% pe lună</span>.
            </p>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted">
                <Lightbulb size={14} className="text-yellow-500" />
            </span>
            <h3 className="text-sm font-semibold text-card-foreground">
                Ce poți face?
            </h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                Recomandări
            </span>
        </div>
        <ul className="space-y-2.5">
            {tips.map(({ icon, action, impact, color, bg, border }) => (
                <li
                    key={action}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${bg} ${border}`}
                >
                    <div className="flex items-center gap-2.5">
                        <span className="text-base">{icon}</span>
                        <span className="text-sm text-card-foreground">{action}</span>
                    </div>
                    <span className={`text-xs font-semibold shrink-0 ml-3 ${color}`}>
                        {impact}
                    </span>
                </li>
            ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
            Aplicând toate recomandările:{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                +$500/lună
            </span>
        </p>

    </div>
}