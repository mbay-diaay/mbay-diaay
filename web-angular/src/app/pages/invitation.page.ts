import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { take } from "rxjs";

import { authErrorMessage } from "@/lib/auth/messages";
import { isPasswordValid } from "@/lib/auth/policy";
import { AuthService } from "../shared/auth.service";
import { LocaleService } from "../shared/locale.service";

/**
 * Port de src/routes/invitation.tsx — activation de compte (premier mot de passe).
 * Le jeton est retiré de l’URL après lecture (replace), comme en React.
 */
@Component({
  selector: "app-invitation-page",
  imports: [RouterLink],
  template: `
    <div
      class="flex min-h-screen items-start justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:items-center sm:p-6"
    >
      <div class="w-full max-w-sm">
        <h1 class="text-xl font-semibold">{{ t()("auth.invitation.title") }}</h1>

        @if (checking()) {
          <p role="status" class="mt-6 text-sm text-muted-foreground">
            {{ t()("auth.invitation.checking") }}
          </p>
        } @else if (known(); as k) {
          <p class="mt-1 text-muted-foreground">{{ t()("auth.invitation.description") }}</p>
          <form class="mt-6 space-y-5" novalidate (submit)="$event.preventDefault(); submitForm()">
            <p class="text-sm text-muted-foreground">
              <span class="font-medium text-foreground">{{ k.name }}</span>
              <br />
              {{ t()("auth.invitation.account", { email: k.maskedEmail }) }}
            </p>
            <div class="space-y-2">
              <label for="pw1" class="text-sm font-medium">{{ t()("auth.invitation.password") }}</label>
              <input
                id="pw1"
                type="password"
                autocomplete="new-password"
                [value]="password()"
                (input)="password.set(inputValue($event))"
                class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                autofocus
              />
            </div>
            <div class="space-y-2">
              <label for="pw2" class="text-sm font-medium">{{ t()("auth.invitation.confirm") }}</label>
              <input
                id="pw2"
                type="password"
                autocomplete="new-password"
                [value]="confirm()"
                (input)="confirm.set(inputValue($event))"
                class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
              />
            </div>
            @if (mismatch()) {
              <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                {{ t()("auth.invitation.mismatch") }}
              </div>
            } @else if (error()) {
              <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                {{ error() }}
              </div>
            }
            <button
              type="submit"
              class="inline-flex h-touch w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              [disabled]="busy() || !canSubmit()"
            >
              {{ busy() ? t()("auth.invitation.submitting") : t()("auth.invitation.submit") }}
            </button>
          </form>
        } @else {
          <div
            role="alert"
            class="mt-6 rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg"
          >
            {{ error() || t()("auth.error.invitation_invalid") }}
          </div>
        }

        <p class="mt-8 text-center text-sm">
          <a
            routerLink="/login"
            class="font-semibold text-primary hover:underline pointer-coarse:inline-block pointer-coarse:py-2"
          >
            {{ t()("auth.invitation.toLogin") }}
          </a>
        </p>
      </div>
    </div>
  `,
})
export default class InvitationPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;

  private token: string | null = null;
  protected readonly checking = signal(false);
  protected readonly known = signal<{ name: string; email: string; maskedEmail: string } | null>(null);
  protected readonly password = signal("");
  protected readonly confirm = signal("");
  protected readonly error = signal("");
  protected readonly busy = signal(false);

  constructor() {
    this.route.queryParamMap
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const urlToken = params.get("jeton");
        if (urlToken) {
          this.token = urlToken;
          void this.router.navigate([], {
            relativeTo: this.route,
            replaceUrl: true,
            queryParams: { jeton: null },
          });
          this.loadInfo();
        } else {
          this.error.set(this.t()("auth.invitation.missing"));
        }
      });
  }

  private loadInfo(): void {
    if (!this.token) return;
    this.checking.set(true);
    this.error.set("");
    this.auth
      .invitationInfo(this.token)
      .then((info) => {
        this.known.set(info);
      })
      .catch((e) => {
        this.error.set(authErrorMessage(e, this.t()));
        this.known.set(null);
      })
      .finally(() => this.checking.set(false));
  }

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected mismatch(): boolean {
    return this.confirm().length > 0 && this.confirm() !== this.password();
  }

  protected canSubmit(): boolean {
    const k = this.known();
    if (!k || !this.token) return false;
    return isPasswordValid(this.password(), k.email) && this.confirm() === this.password();
  }

  protected async submitForm(): Promise<void> {
    if (!this.canSubmit() || !this.token || this.busy()) return;
    this.busy.set(true);
    this.error.set("");
    try {
      await this.auth.acceptInvitation(this.token, this.password());
      await this.router.navigate(["/login"], { queryParams: { motdepasse: "modifie" } });
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
}
