import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Check } from "lucide-react"
import { Link } from "react-router"

export default function HomeHeroSection() {
    return <section className="relative w-full overflow-hidden bg-background px-6 py-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                    Take control of your{" "}
                    <span className="text-amber-400">financial future</span>
                </h1>

                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                    Track expenses, set budgets, and build better money habits.
                    All in one simple, beautiful app.
                </p>

                <div className="mt-8 flex gap-3">
                    <Button asChild size="lg" className="gap-2 bg-amber-400 text-black hover:bg-finance-warning/90">
                        <Link to="/signin">
                            Get started for free
                            <ArrowRight size={18} />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="gap-2">
                        <Link to="/about">
                            <Play size={16} />
                            See how it works
                        </Link>
                    </Button>
                </div>

                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    {["Free to start", "Secure & private", "Sync everywhere"].map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Check size={15} className="text-amber-400" />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl p-4">
                    <img
                        src="/hero-2.png"
                        alt="Hero"
                        className="relative z-20"
                    />

                    <div className="absolute top-50 left-0 z-10 h-50 w-100 rounded-full bg-amber-400" />
                </div>
            </div>
        </div>
    </section>
}