import {
  TrendingDown,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function BudgetPage() {
  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Budget Overview</h1>

      <div className="grid grid-cols-2 gap-4">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </section>
  );
}
