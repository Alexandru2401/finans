import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function OurMission() {
  return (
    <section
      className="bg-background py-8 px-6 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Our mission
          </h2>
          <p className="text-muted-foreground">
            Budgeting shouldn't be complicated. It should be clear, organized
            and actually help you make better decisions.
          </p>
        </div>

        {/* Two columns: intro + image */}
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2">
          {/* Left — intro */}


          {/* Right — image */}
          <div className="rounded-2xl border border-border p-2 shadow-xl">
            <img src="/cta2.png" alt="Dashboard preview" className="w-full rounded-xl object-cover" />
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p className="text-2xl font-semibold text-foreground">
              But… why choose us?
            </p>
            <p>
              Tired of juggling spreadsheets, apps and bank statements just to
              understand where your money goes?
            </p>
            <p>
              We help individuals and businesses simplify financial management —
              without stress, confusion or wasted time.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Your money, your control</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                A flexible and user-friendly interface that adapts to your
                lifestyle, helping you track expenses, set budgets and stay in
                control effortlessly.
              </p>
              <Button asChild className="w-fit bg-amber-500 text-black hover:bg-finance-warning/90">
                <Link to="/signup">Join over 100,000 users in control</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-finance-warning/30 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Your business, your growth</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                Manage multiple teams, track company spending and gain financial
                insights — all from one centralized platform.
              </p>
              <Button asChild variant="outline" className="w-fit">
                <Link to="/enterprise">Trusted by growing businesses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}