import type { ExpenseCategory } from "@/lib/mock/exploitation";
import type { MessageKey } from "@/lib/i18n";

export const EXPENSE_CATEGORY_LABEL: Record<ExpenseCategory, MessageKey> = {
  intrants: "charges.cat.intrants",
  "main-d'œuvre": "charges.cat.main-d'œuvre",
  transport: "charges.cat.transport",
  irrigation: "charges.cat.irrigation",
  "location de matériel": "charges.cat.location de matériel",
  autre: "charges.cat.autre",
};

/** Aide-mémoire : ce qu'on range dans chaque catégorie. */
export const EXPENSE_CATEGORY_TIP: Record<ExpenseCategory, MessageKey> = {
  intrants: "charges.tip.intrants",
  "main-d'œuvre": "charges.tip.main-d'œuvre",
  transport: "charges.tip.transport",
  irrigation: "charges.tip.irrigation",
  "location de matériel": "charges.tip.location de matériel",
  autre: "charges.tip.autre",
};
