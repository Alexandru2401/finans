import { BarChart3, Check, FileText, Lock, PieChart, RefreshCw, Target } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
    { icon: PieChart, title: "Smart Budgeting", desc: "Create budgets in minutes and get alerts when you're close to your limits." },
    { icon: FileText, title: "Expense Tracking", desc: "Automatically track your spending and see where your money goes." },
    { icon: Target, title: "Financial Goals", desc: "Set goals, track progress, and stay motivated to build your future." },
    { icon: BarChart3, title: "Analytics & Insights", desc: "Beautiful charts and insights to help you make better financial decisions." },
    { icon: Lock, title: "Secure & Private", desc: "Your data is encrypted and always private. We never sell your information." },
    { icon: RefreshCw, title: "Sync Everywhere", desc: "Access your accounts on any device, anytime. Always up to date." },
]

const points = [
    "Know where your money goes",
    "Make smarter spending decisions",
    "Build better financial habits",
    "Achieve your financial goals",
];


export default function HomeFeatures() {
    return <section className="w-full px-6 py-8">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2">
            {/* Left — copy */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    See your money clearly.{" "}
                    <span className="text-amber-400">Live better.</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Join thousands of people who've already transformed their financial lives.
                </p>

                <ul className="mt-6 space-y-3">
                    {points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-finance-warning-bg">
                                <Check size={13} className="text-finance-warning" />
                            </span>
                            {p}
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/prices" className="flex h-12 items-center gap-2 rounded-lg bg-foreground px-4 text-background">
                        <span className="text-2xl"></span>
                        <span className="text-left leading-tight">
                            <span className="block text-[10px] opacity-70">See our</span>
                            <span className="block text-sm font-semibold">Pricing</span>
                        </span>
                    </Link>
                    <Link to="/signin" className="flex h-12 items-center gap-2 rounded-lg bg-foreground px-4 text-background">
                        <span className="text-xl">▶</span>
                        <span className="text-left leading-tight">
                            <span className="block text-[10px] opacity-70">Get started</span>
                            <span className="block text-sm font-semibold">Create account</span>
                        </span>
                    </Link>
                </div>
            </div>

            {/* Right — dashboard screenshot slot */}
            <div className="rounded-2xl border border-border p-2 shadow-xl">
                <img src="/cta.png" alt="Dashboard preview" className="w-full rounded-xl object-cover" />
            </div>
        </div>
    </section>
}