import { BarChart3, FileText, Lock, PieChart, RefreshCw, Target } from "lucide-react";

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

const brands = ["Forbes", "TechCrunch", "MarketWatch", "Yahoo Finance", "Product Hunt"];

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: "Is it free to get started?",
        a: "Yes. You can create an account and track your finances for free, with no credit card required. Upgrade anytime if you need advanced features.",
    },
    {
        q: "Is my financial data secure?",
        a: "Your data is encrypted in transit and at rest. We never sell your information to third parties, and you stay in control of what you share.",
    },
    {
        q: "Do I need to connect my bank account?",
        a: "No. You can add transactions manually if you prefer. Bank connections are optional and only there to save you time.",
    },
    {
        q: "Can I use it for my business?",
        a: "Yes. Alongside personal budgeting, you can track company spending, manage teams and get financial insights from one place.",
    },
    {
        q: "Does it work on mobile?",
        a: "Yes. Your account syncs across every device, so your budget is always up to date whether you're on desktop or on the go.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Absolutely. There are no long-term contracts. You can downgrade or cancel your plan whenever you want, no questions asked.",
    },
];

export default function HomeFaq() {
    return <section className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-finance-warning">
                FAQ
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
                Everything you need to know before getting started.
            </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
            {faqs.map(({ q, a }, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                        {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </section>
}