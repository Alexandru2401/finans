import { Button } from "@/components/ui/button";
import { Check, Coins, Play } from "lucide-react";
import { Link } from "react-router-dom";

const points = [
  "Know where your money goes",
  "Make smarter spending decisions",
  "Build better financial habits",
  "Achieve your financial goals",
];

export default function HomeFeatures() {
  return (
    <section className="w-full px-3 sm:px-6 py-8">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            See your money clearly.{" "}
            <span className="text-amber-400">Live better.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of people who've already transformed their financial
            lives.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-finance-warning-bg">
                  <Check size={13} className="text-finance-warning" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-amber-400 text-black hover:bg-finance-warning/90"
            >
              <Link to="/signin">
                See pricing
                <Coins size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/signin">
                Start for free
                <Play size={18} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right — dashboard screenshot slot */}
        <div className="rounded-2xl border border-border p-2 shadow-xl">
          <img
            src="/cta.png"
            alt="Dashboard preview"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
