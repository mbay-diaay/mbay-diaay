import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { can, useStore } from "@/lib/store";
import type { Permission } from "@/lib/permissions";
import { cn } from "@/lib/utils";

export interface RowAction {
  label: string;
  icon?: LucideIcon;
  /** Action locale (dialogue, mise à jour du store…). */
  onSelect?: () => void;
  /** Navigation : `to` + éventuels `params` / `search` (TanStack Router). */
  to?: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  /** L'action n'apparaît que si la session porte cette permission. */
  perm?: Permission;
  /** Action destructrice : rendue en rouge, après un séparateur. */
  danger?: boolean;
  hidden?: boolean;
  disabled?: boolean;
}

/** Menu « ⋯ » des lignes et fiches : les droits viennent de la session, jamais du composant appelant. */
export function RowActions({
  items,
  label = "Actions",
  className,
  title,
}: {
  items: RowAction[];
  label?: string;
  className?: string;
  title?: string | undefined;
}) {
  const session = useStore((s) => s.session);
  const navigate = useNavigate();
  const visible = items.filter((i) => !i.hidden && (!i.perm || can(session, i.perm)));
  if (!visible.length) return null;
  const safe = visible.filter((i) => !i.danger);
  const danger = visible.filter((i) => i.danger);

  const run = (i: RowAction) => {
    if (i.onSelect) i.onSelect();
    else if (i.to) void navigate({ to: i.to, params: i.params, search: i.search } as never);
  };
  const item = (i: RowAction) => (
    <DropdownMenuItem
      key={i.label}
      disabled={i.disabled}
      onSelect={() => run(i)}
      className={cn(i.danger && "text-danger-fg focus:bg-danger-bg focus:text-danger-fg")}
    >
      {i.icon && <i.icon className="size-4" />}
      {i.label}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={label}
        title={label}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "inline-grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted",
          className,
        )}
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[1000] min-w-52"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <>
            <DropdownMenuLabel className="truncate text-xs text-muted-foreground">
              {title}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {safe.map(item)}
        {safe.length > 0 && danger.length > 0 && <DropdownMenuSeparator />}
        {danger.map(item)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
