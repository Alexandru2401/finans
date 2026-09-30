import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function CardError({
  message = "Could not load data.",
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
    >
      <AlertCircle className="h-6 w-6 text-finance-danger" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
