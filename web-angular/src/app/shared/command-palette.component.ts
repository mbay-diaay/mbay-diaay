import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  afterNextRender,
  HostListener,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { can, inScope, type Session } from "@/lib/store";
import { maskPhone } from "@/lib/format";
import { NAV, navAllowed, type NavItem } from "@/lib/nav";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { LucideAngularModule } from "lucide-angular";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Port Angular simplifié de `src/components/app/CommandPalette.tsx` — ⌘K / Ctrl+K,
 * pages autorisées + producteurs / organisations filtrés par recherche texte (ou téléphone si droit).
 */
@Component({
  selector: "app-command-palette",
  imports: [CommonModule, LucideAngularModule],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-3 pt-6 sm:items-center sm:pt-0"
        (click)="closeFromBackdrop($event)"
        role="presentation"
      >
        <div
          class="flex max-h-[min(70vh,32rem)] w-full max-w-lg flex-col overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg"
          (click)="$event.stopPropagation()"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cmd-palette-title"
        >
          <h2 id="cmd-palette-title" class="sr-only">{{ t()("shell.palette.title") }}</h2>
          <div class="border-b px-3 py-2">
            <input
              #qInput
              type="search"
              class="w-full rounded-md border-0 bg-transparent px-2 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:ring-0"
              [attr.aria-label]="t()('shell.palette.placeholder')"
              [placeholder]="t()('shell.palette.placeholder')"
              [value]="q()"
              (input)="onQuery($any($event.target).value)"
            />
          </div>
          <div class="flex-1 overflow-y-auto p-2 text-sm">
            @if (hasAnyResults()) {
              @if (pageItems().length > 0) {
                <div class="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {{ t()("shell.palette.pages") }}
                </div>
                @for (i of pageItems(); track i.to) {
                  <button
                    type="button"
                    class="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left hover:bg-muted"
                    (click)="goPage(i)"
                  >
                    <lucide-angular [img]="i.icon" class="size-4 shrink-0 text-muted-foreground" />
                    <span>{{ t()(i.labelKey) }}</span>
                  </button>
                }
              }
              @if (producerHits().length > 0) {
                <div class="mt-2 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {{ t()("shell.palette.producers") }}
                </div>
                @for (p of producerHits(); track p.id) {
                  <button
                    type="button"
                    class="flex w-full flex-col gap-0.5 rounded-sm px-2 py-2 text-left hover:bg-muted sm:flex-row sm:items-center"
                    (click)="goProducer(p.id)"
                  >
                    <span class="font-medium">{{ p.firstName }} {{ p.lastName }}</span>
                    <span class="text-xs text-muted-foreground sm:ml-auto">
                      {{ p.code }} · {{ p.village }}
                      @if (showPhoneHit()(p)) {
                        <span> · {{ maskPhone(p.phone) }}</span>
                      }
                    </span>
                  </button>
                }
              }
              @if (orgHits().length > 0) {
                <div class="mt-2 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {{ t()("shell.palette.orgs") }}
                </div>
                @for (o of orgHits(); track o.id) {
                  <button
                    type="button"
                    class="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left hover:bg-muted"
                    (click)="goOrg(o.id)"
                  >
                    <span class="flex-1">{{ o.name }}</span>
                    <span class="text-xs text-muted-foreground">{{ o.village }}</span>
                  </button>
                }
              }
            } @else if (q().trim()) {
              <p class="px-2 py-6 text-center text-muted-foreground">
                {{ t()("shell.palette.empty", { q: q() }) }}
              </p>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class CommandPaletteComponent {
  private readonly router = inject(Router);
  private readonly store = inject(StoreService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly localeService = inject(LocaleService);

  private readonly qInput = viewChild<ElementRef<HTMLInputElement>>("qInput");

  protected readonly t = this.localeService.t;
  protected readonly maskPhone = maskPhone;

  /** Ouverture depuis le shell (bouton loupe). */
  readonly open = signal(false);
  protected readonly q = signal("");
  protected readonly session = computed<Session | null>(() => this.store.state().session);

  protected readonly needle = computed(() => norm(this.q().trim()));

  protected readonly byPhone = computed(() => {
    const session = this.session();
    const q = this.q();
    if (!session || !can(session, "producer.edit")) return "";
    const d = digits(q);
    return d.length >= 4 ? d : "";
  });

  protected readonly pageItems = computed((): NavItem[] => {
    const session = this.session();
    const n = this.needle();
    if (!session) return [];
    const match = (s: string) => !n || norm(s).includes(n);
    const t = this.t();
    return NAV.flatMap((g) => g.items).filter(
      (i) => !i.soon && navAllowed(session, i) && match(t(i.labelKey)),
    );
  });

  protected readonly producerHits = computed(() => {
    const session = this.session();
    const n = this.needle();
    const phoneQ = this.byPhone();
    if (!session || !n) return [];
    const match = (s: string) => !n || norm(s).includes(n);
    const producers = this.store.state().producers.filter((p) => !p.mergedInto);
    const mine = inScope(producers, session);
    return mine
      .filter(
        (p) =>
          match(`${p.firstName} ${p.lastName} ${p.code} ${p.village}`) ||
          (!!phoneQ && digits(p.phone).includes(phoneQ)),
      )
      .slice(0, 8);
  });

  protected readonly showPhoneHit = computed(() => {
    const phoneQ = this.byPhone();
    return (p: { phone: string }) => !!phoneQ && digits(p.phone).includes(phoneQ);
  });

  protected readonly orgHits = computed(() => {
    const session = this.session();
    const n = this.needle();
    if (!session || !n) return [];
    const match = (s: string) => !n || norm(s).includes(n);
    const orgs = inScope(this.store.state().orgs, session);
    return orgs.filter((o) => match(`${o.name} ${o.village}`)).slice(0, 6);
  });

  protected readonly hasAnyResults = computed(
    () =>
      this.pageItems().length > 0 ||
      this.producerHits().length > 0 ||
      this.orgHits().length > 0,
  );

  constructor() {
    afterNextRender(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          this.toggle();
        }
      };
      document.addEventListener("keydown", onKey);
      this.destroyRef.onDestroy(() => document.removeEventListener("keydown", onKey));
    });
  }

  /** Ouvre la palette (bouton en-tête). */
  show(): void {
    this.open.set(true);
    this.focusInputSoon();
  }

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (next) this.focusInputSoon();
    else {
      this.q.set("");
    }
  }

  protected onQuery(v: string): void {
    this.q.set(v);
  }

  protected closeFromBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close();
  }

  protected close(): void {
    this.open.set(false);
    this.q.set("");
  }

  private focusInputSoon(): void {
    afterNextRender(() => {
      const el = this.qInput()?.nativeElement;
      el?.focus();
      el?.select();
    });
  }

  @HostListener("document:keydown.escape")
  protected onEscape(): void {
    if (this.open()) this.close();
  }

  protected goPage(i: NavItem): void {
    this.close();
    void this.router.navigateByUrl(i.to);
  }

  protected goProducer(id: string): void {
    this.close();
    void this.router.navigate(["/producteurs", id]);
  }

  protected goOrg(id: string): void {
    this.close();
    void this.router.navigate(["/organisations", id]);
  }
}
