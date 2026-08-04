import { BarChart3, FileText, Lock, PieChart, RefreshCw, Target } from "lucide-react";

const features = [
    { icon: PieChart, title: "Smart Budgeting", desc: "Create budgets in minutes and get alerts when you're close to your limits." },
    { icon: FileText, title: "Expense Tracking", desc: "Automatically track your spending and see where your money goes." },
    { icon: Target, title: "Financial Goals", desc: "Set goals, track progress, and stay motivated to build your future." },
    { icon: BarChart3, title: "Analytics & Insights", desc: "Beautiful charts and insights to help you make better financial decisions." },
    { icon: Lock, title: "Secure & Private", desc: "Your data is encrypted and always private. We never sell your information." },
    { icon: RefreshCw, title: "Sync Everywhere", desc: "Access your accounts on any device, anytime. Always up to date." },
]

export default function HomeCardCta() {
    return <section className="w-full bg-background px-3 sm:px-6 py-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
            <div className="mb-6 max-w-2xl">
                <p className="mb-2 text-xs font-semibold uppercase text-amber-400">
                    Powerful features
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    Everything you need to manage your money
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Built to help you save more, spend smarter, and reach your financial goals.
                </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title}>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400">
                            <Icon size={20} />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
}