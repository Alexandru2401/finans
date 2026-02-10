import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PersonalPlans from "@/components/public/data/PublicPricesCards";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicPricesPersonalPage() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Control Over Your Finances
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan to manage your money, track expenses, and
          achieve your financial goals
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {PersonalPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400">
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    className={`h-6 w-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span
                        className={
                          feature.includes("Everything") ? "font-semibold" : ""
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link to="/paypage/personal">
                  <Button
                    className="w-full cursor-pointer"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.price === "0"
                      ? "Get Started Free"
                      : "Start Free Trial"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I switch plans later?</AccordionTrigger>
            <AccordionContent>
              Yes! You can upgrade or downgrade your plan at any time. Changes
              take effect immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>
              All paid plans include a 14-day free trial. No credit card
              required to start.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, PayPal, and direct bank
              transfers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Cancel your subscription at any time with no
              cancellation fees.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we use bank-level 256-bit encryption to protect your data. We
              never sell your information to third parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
            <AccordionContent>
              We offer a 30-day money-back guarantee. If you're not satisfied,
              contact us for a full refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
