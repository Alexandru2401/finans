export const PERIODS = [
  "this-month",
  "last-month",
  "last-3",
  "last-6",
  "this-year",
] as const;

// Labels live in the translations, under dashboard.periods.<period>
export type Period = (typeof PERIODS)[number];
