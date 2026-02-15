import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import BudgetDetails from "./BudgetDetails";
import { useBudgetStore } from "@/store/dashboardStore/BudgetStoreContext";

interface BudgetCardsProps {
  title: string;
  identifier: string;
  value: number;
  isExpanded?: boolean;
  iconColor?: string;
  badgeColor?: string;
  onExpand: (identifier: string) => void;
}

export default function BudgetCards({
  title,
  identifier,
  value,
  isExpanded = false,
  iconColor = "text-green-500",
  badgeColor = "bg-green-500",
  onExpand,
}: BudgetCardsProps) {
  const { totalIncome, totalExpenses, totalSavings } = useBudgetStore();

  return (
    <Card className="relative pb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Monthly {title.toLowerCase()} summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className={`h-4 w-4 ${iconColor}`} />
            <span className="text-sm font-medium">Total {title}: </span>
          </div>

          <Badge
            variant="default"
            className={`${badgeColor} text-white px-5 py-2`}
          >
            $
            {identifier === "income"
              ? totalIncome
              : identifier === "expenses"
                ? totalExpenses
                : totalSavings}
          </Badge>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t">
            <BudgetDetails identifier={identifier} value={value} />
          </div>
        )}
      </CardContent>

      <Badge
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 cursor-pointer flex items-center gap-2"
        onClick={() => onExpand(identifier)}
      >
        {isExpanded ? (
          <>
            Hide details
            <ChevronUp size={14} />
          </>
        ) : (
          <>
            See details
            <ChevronDown size={14} />
          </>
        )}
      </Badge>
    </Card>
  );
}
