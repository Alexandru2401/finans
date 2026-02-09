import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-background py-24 min-h-[calc(60vh-80px)] px-6 scroll-mt-24 bg-linear-to-br from-amber-200 via-amber-300 to-yellow-200"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Our mission
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Budgeting shouldn’t be complicated. It should be clear, organized
            and actually help you make better decisions.
          </p>
        </div>

        {/* Intro text */}
        <div className="mx-auto mb-16 max-w-3xl text-center space-y-4 text-muted-foreground">
          <p>
            Tired of juggling spreadsheets, apps and bank statements just to
            understand where your money goes?
          </p>
          <p>
            We help individuals and businesses simplify financial management —
            without stress, confusion or wasted time.
          </p>
          <p className="font-medium text-foreground">But… why choose us?</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal */}
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                Your money, your control
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                A flexible and user-friendly interface that adapts to your
                lifestyle, helping you track expenses, set budgets and stay in
                control effortlessly.
              </p>

              <Button asChild className="w-fit">
                <Link to="/signup">Join over 100,000 users in control</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="border-primary/30 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                Your business, your growth
              </CardTitle>
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
