import { Check, Zap, Crown } from "lucide-react";

// Textele sunt în i18n: "prices.plans.<id>" și "prices.features.<cheie>"
// Prețurile sunt pe monedă: RON pentru română, USD pentru engleză
export type PlanCurrency = "RON" | "USD";

const PersonalPlans = [
  {
    id: "free",
    price: { RON: 0, USD: 0 },
    icon: Check,
    popular: false,
    features: [
      "basicBudget",
      "categorization",
      "monthlyReports",
      "threeBankAccounts",
      "mobileApp",
      "emailSupport",
    ],
  },
  {
    id: "pro",
    price: { RON: 44.99, USD: 9.99 },
    icon: Zap,
    popular: true,
    includes: "free",
    features: [
      "advancedAnalytics",
      "unlimitedBankAccounts",
      "goalTracking",
      "billReminders",
      "customCategories",
      "exportData",
      "priorityEmailSupport",
      "adFree",
    ],
  },
  {
    id: "premium",
    price: { RON: 89.99, USD: 19.99 },
    icon: Crown,
    popular: false,
    includes: "pro",
    features: [
      "investmentTracking",
      "taxPlanning",
      "multiCurrency",
      "coaching",
      "forecasting",
      "debtCalculator",
      "netWorth",
      "familySharing",
      "support247",
    ],
  },
] as const;

export default PersonalPlans;
