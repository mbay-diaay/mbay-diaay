import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** Valeur réservée au choix « tous » : aucun filtre appliqué. */
export const ALL = "__all";

/**
 * Liste déroulante de filtre (bordure + chevron uniquement — pas d'icône Filter répétée).
 * Sans filtre actif : placeholder gris ; avec filtre : valeur en texte normal et champ teinté.
 */
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel = `${label} : tous`,
  placeholder = label,
  className,
}: {
  /** Nom du filtre, aussi lu par les lecteurs d'écran. */
  label: string;
  /** `ALL` quand aucun filtre n'est appliqué. */
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [value: string, label: string])[];
  /** Texte du choix « tous » dans la liste déroulante. */
  allLabel?: string;
  /** Texte gris du champ quand aucun filtre n'est actif : court, pour ne pas être tronqué (défaut : le libellé). */
  placeholder?: string;
  className?: string;
}) {
  const active = value !== ALL;
  return (
    // Radix affiche le placeholder quand la valeur est vide : c'est ce qui grise l'état « tous ».
    <Select value={active ? value : ""} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className={cn(active && "border-primary bg-primary-soft/40 font-medium", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
