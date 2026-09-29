import { z } from "zod";

export const NOTES_MAX_LENGTH = 1500;

const BudgetItemSchema = z.object({
  type: z.enum(["income", "expenses", "savings"]),

  category: z.string().min(1, { message: "Category is required." }),

  amount: z
    .string()
    .trim()
    .min(1, { message: "Amount is required." })
    .transform(Number)
    .pipe(
      z
        .number({ error: "Please enter a valid amount." })
        .positive({ message: "Amount must be greater than 0." }),
    ),

  notes: z.string().trim().max(NOTES_MAX_LENGTH, {
    message: `Notes can't be longer than ${NOTES_MAX_LENGTH} characters.`,
  }),

  date: z.string(),
});

export type BudgetItemInput = z.input<typeof BudgetItemSchema>;
export type BudgetItemPayload = z.output<typeof BudgetItemSchema>;

export default BudgetItemSchema;
