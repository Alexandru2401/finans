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
  return (
    <section className="p-3 mx-auto max-w-7xl">
      <div className="mb-12 text-center">
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
  );
}
