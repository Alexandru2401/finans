import { Check, Zap, Crown } from "lucide-react";

const PersonalPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started with budget tracking",
    icon: Check,
    popular: false,
    features: [
      "Basic budget tracking",
      "Expense categorization",
      "Monthly financial reports",
      "Up to 3 bank accounts",
      "Mobile app access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "9.99",
    description: "Ideal for serious budgeters and savers",
    icon: Zap,
    popular: true,
    features: [
      "Everything in Free, plus:",
      "Advanced analytics & insights",
      "Unlimited bank accounts",
      "Goal tracking & savings plans",
      "Bill reminders & alerts",
      "Custom categories & tags",
      "Export data to CSV/Excel",
      "Priority email support",
      "Ad-free experience",
    ],
  },
  {
    name: "Premium",
    price: "19.99",
    description: "Complete financial control and planning",
    icon: Crown,
    popular: false,
    features: [
      "Everything in Pro, plus:",
      "Investment tracking",
      "Tax planning tools",
      "Multi-currency support",
      "Personalized financial coaching",
      "Advanced forecasting & predictions",
      "Debt payoff calculator",
      "Net worth tracking",
      "Family sharing (up to 5 members)",
      "24/7 priority support",
    ],
  },
];

export default PersonalPlans;
