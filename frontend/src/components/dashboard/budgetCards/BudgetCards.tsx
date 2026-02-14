import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Divide,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pencil, Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import BudgetDetails from "./BudgetDetails";

interface BudgetCardsProps {
  title: string;
  identifier: string;
  value: number;
  isEditing: boolean;
  isExpanded?: boolean;
  iconColor?: string;
  badgeColor?: string;
  onEdit: (identifier: string) => void;
  onSave: (identifier: string) => void;
  onChange: (identifier: string, value: string) => void;
  onExpand: (identifier: string) => void;
}

export default function BudgetCards({
  title,
  identifier,
  value,
  isEditing,
  isExpanded = false,
  iconColor = "text-green-500",
  badgeColor = "bg-green-500",
  onEdit,
  onSave,
  onChange,
  onExpand,
}: BudgetCardsProps) {
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
          {isEditing ? (
            <Input
              defaultValue={value.toString()}
              className="w-24"
              type="number"
              onChange={(e) => onChange(identifier, e.target.value)}
            />
          ) : (
            <Badge
              variant="default"
              className={`${badgeColor} text-white px-5 py-2`}
            >
              ${value.toLocaleString()}
            </Badge>
          )}
          {isEditing ? (
            <Tooltip>
              <TooltipTrigger>
                <Check
                  onClick={() => onSave(identifier)}
                  size={20}
                  className="cursor-pointer ml-2"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Mark as done</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <Pencil
                  onClick={() => onEdit(identifier)}
                  size={20}
                  className="cursor-pointer ml-2"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Edit {title.toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Conținut expandat */}
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
