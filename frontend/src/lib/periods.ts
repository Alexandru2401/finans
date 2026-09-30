export const PERIOD_OPTIONS = [
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "last-3", label: "Last 3 months" },
  { value: "last-6", label: "Last 6 months" },
  { value: "this-year", label: "This year" },
] as const;

export function periodLabel(period: string) {
  return PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? period;
}
