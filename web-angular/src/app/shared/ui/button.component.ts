import { Component, computed, input } from "@angular/core";
import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const SIZES = {
  default: "h-9 px-4 py-2 pointer-coarse:h-touch",
  sm: "h-8 rounded-md px-3 text-xs pointer-coarse:h-touch pointer-coarse:text-sm",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9 pointer-coarse:size-touch",
} as const;

export type UiButtonVariant = keyof typeof VARIANTS;
export type UiButtonSize = keyof typeof SIZES;

/** Bouton Tailwind partagé — équivalent léger de src/components/ui/button.tsx. */
@Component({
  selector: "ui-button",
  host: {
    class: "contents",
  },
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel() || null"
      [class]="classes()"
      (click)="onClick($event)"
    >
      <ng-content />
    </button>
  `,
})
export class UiButtonComponent {
  readonly variant = input<UiButtonVariant>("default");
  readonly size = input<UiButtonSize>("default");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly disabled = input(false);
  readonly className = input("", { alias: "class" });
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly classes = computed(() =>
    cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      VARIANTS[this.variant()],
      SIZES[this.size()],
      this.className(),
    ),
  );

  /** Remonte le clic ; le parent peut aussi écouter (click) sur ui-button grâce à contents. */
  onClick(_event: MouseEvent) {
    /* no-op — bubble via host contents */
  }
}
