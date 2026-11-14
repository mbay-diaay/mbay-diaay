import type { MessageKey } from "@/lib/i18n";

import type { IconName } from "./icon.component";

/**
 * Champs types de l'application : un seul endroit pour l'exemple affiché (placeholder), l'icône,
 * le clavier mobile, l'autocomplétion et la longueur maximale.
 *
 * `<ui-text-field preset="phone" [label]="…" … />` — toute valeur passée explicitement au champ reste prioritaire.
 * Ajouter un type ici le rend disponible dans tous les formulaires.
 */
export type FieldPreset =
  | "firstName"
  | "lastName"
  | "age"
  | "phone"
  | "cni"
  | "village"
  | "commune"
  | "region"
  | "email"
  | "amount"
  | "note"
  | "scoopName"
  | "scoopCode"
  | "period"
  | "meetingTitle"
  | "place"
  | "agendaItem";

export interface FieldPresetDef {
  placeholder: MessageKey;
  icon?: IconName;
  type?: "text" | "email" | "tel" | "number" | "datetime-local";
  inputmode?: "text" | "numeric" | "tel" | "email";
  autocomplete?: string;
  maxlength?: number;
}

export const FIELD_PRESETS: Record<FieldPreset, FieldPresetDef> = {
  firstName: { placeholder: "ui.field.ph.firstName", icon: "person", autocomplete: "given-name", maxlength: 60 },
  lastName: { placeholder: "ui.field.ph.lastName", autocomplete: "family-name", maxlength: 60 },
  age: { placeholder: "ui.field.ph.age", icon: "calendar_today", type: "number", inputmode: "numeric", maxlength: 3 },
  phone: { placeholder: "ui.field.ph.phone", icon: "call", type: "tel", inputmode: "tel", autocomplete: "tel", maxlength: 20 },
  cni: { placeholder: "ui.field.ph.cni", icon: "badge", inputmode: "numeric", autocomplete: "off", maxlength: 20 },
  village: { placeholder: "ui.field.ph.village", icon: "location_on", maxlength: 80 },
  commune: { placeholder: "ui.field.ph.commune", icon: "location_on", maxlength: 80 },
  region: { placeholder: "ui.field.ph.region", icon: "landscape", maxlength: 80 },
  email: { placeholder: "ui.field.ph.email", icon: "mail", type: "email", inputmode: "email", autocomplete: "email", maxlength: 120 },
  amount: { placeholder: "ui.field.ph.amount", icon: "payments", type: "number", inputmode: "numeric" },
  note: { placeholder: "ui.field.ph.note", icon: "edit", maxlength: 200 },
  scoopName: { placeholder: "ui.field.ph.scoopName", icon: "apartment", maxlength: 120 },
  scoopCode: { placeholder: "ui.field.ph.scoopCode", maxlength: 5 },
  period: { placeholder: "ui.field.ph.period", icon: "calendar_today", inputmode: "numeric", maxlength: 7 },
  meetingTitle: { placeholder: "ui.field.ph.meetingTitle", icon: "event", maxlength: 120 },
  place: { placeholder: "ui.field.ph.place", icon: "location_on", maxlength: 120 },
  agendaItem: { placeholder: "ui.field.ph.agendaItem", maxlength: 160 },
};
