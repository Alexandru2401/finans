import PublicAboutPage from "./PublicAboutPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CustomerReviews from "./CustomerReviews";

export default function PublicHomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(90vh-80px)] w-full items-center justify-center bg-linear-to-br from-amber-200 via-amber-300 to-yellow-200 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Take Control of Your Finances
          </h1>

          <p className="mb-4 text-lg text-gray-800 md:text-xl">
            Your personal finance management tool, built for clarity and
            control.
          </p>

          <p className="mb-10 text-base text-gray-700 md:text-lg">
            Track expenses, set smart budgets, and achieve your financial goals
            — all in one place.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/signin"
              className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get Started
            </a>

            <a
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-md border border-gray-900 px-8 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* CTA 1 */}
      <section className="w-full bg-background py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Discover the Power of Financial Control
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal */}
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">For personal use</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p className="text-muted-foreground">
                  Track expenses, set budgets and gain full control over your
                  personal finances.
                </p>

                <Button asChild className="w-fit">
                  <Link to="/signin">Start for free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-primary/30 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">For enterprise level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p className="text-muted-foreground">
                  Manage your business finances with clarity, insights and
                  confidence.
                </p>

                <Button asChild variant="outline" className="w-fit">
                  <Link to="/prices">See pricing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <PublicAboutPage />
      <CustomerReviews />
    </>
  );
}
