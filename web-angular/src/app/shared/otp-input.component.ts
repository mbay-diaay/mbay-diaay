import {
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChildren,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import { OTP_LENGTH } from "@/lib/auth/policy";

/**
 * Six digit cells with auto-advance, backspace-to-previous, paste, and
 * submit-on-complete — parity with React `input-otp` + `OtpStep`.
 */
@Component({
  selector: "app-otp-input",
  imports: [],
  host: {
    role: "group",
    "[attr.aria-labelledby]": "labelledBy()",
  },
  template: `
    <div class="flex justify-center gap-2 max-[359px]:gap-1.5" [class.pointer-events-none]="disabled()">
      @for (digitIndex of indices(); track digitIndex) {
        <input
          #cell
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [attr.id]="digitIndex === 0 ? fieldId() : null"
          class="size-12 max-[359px]:size-10 rounded-md border border-input bg-transparent text-center text-lg tabular shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          [disabled]="disabled()"
          [value]="digits()[digitIndex]"
          (input)="onCellInput(digitIndex, $event)"
          (keydown)="onCellKeydown(digitIndex, $event)"
          (paste)="onCellPaste($event)"
        />
      }
    </div>
  `,
})
export class OtpInputComponent {
  private readonly platformId = inject(PLATFORM_ID);

  /** Bound to the visible &lt;label for=…&gt; on the page. */
  readonly fieldId = input<string>("otp");
  readonly labelledBy = input<string | null>(null);

  /** Mirrors parent `otpCode` so clears/resets propagate. */
  readonly value = input<string>("");

  readonly length = input(OTP_LENGTH);
  readonly disabled = input(false);

  readonly valueChange = output<string>();
  readonly complete = output<string>();

  private readonly cells = viewChildren<ElementRef<HTMLInputElement>>("cell");

  protected readonly indices = computed(() => Array.from({ length: this.length() }, (_, i) => i));

  /** One slot per digit; only [0-9] or "". */
  protected readonly digits = signal<string[]>(emptySlots(OTP_LENGTH));

  private readonly _syncValueFromParent = effect(() => {
    // Length is fixed to OTP_LENGTH; re-read so the effect tracks `length` if it ever changes.
    const len = this.length();
    const normalized = this.value().replace(/\D/g, "").slice(0, len);
    const current = this.digits().join("");
    if (normalized === current) return;
    const next = emptySlots(len);
    for (let i = 0; i < normalized.length; i++) next[i] = normalized[i]!;
    this.digits.set(next);
  });

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      // Focus first cell when the control becomes ready (e.g. OTP step shown).
      queueMicrotask(() => this.focusIndex(0));
    });
  }

  protected onCellInput(index: number, event: Event): void {
    const el = event.target as HTMLInputElement;
    const digit = el.value.replace(/\D/g, "").slice(-1);

    if (!digit) {
      this.updateSlot(index, "");
      this.emit();
      return;
    }

    this.updateSlot(index, digit);
    this.emit();

    if (index < this.length() - 1) {
      this.focusIndex(index + 1);
    } else {
      const code = this.digits().join("");
      if (code.length === this.length()) {
        this.complete.emit(code);
      }
    }
  }

  protected onCellKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      if (this.digits()[index]) {
        this.updateSlot(index, "");
        this.emit();
      } else if (index > 0) {
        this.focusIndex(index - 1);
        this.updateSlot(index - 1, "");
        this.emit();
      }
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      this.focusIndex(index - 1);
      return;
    }
    if (event.key === "ArrowRight" && index < this.length() - 1) {
      event.preventDefault();
      this.focusIndex(index + 1);
    }
  }

  protected onCellPaste(event: ClipboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const text = event.clipboardData?.getData("text") ?? "";
    this.applyPastedDigits(text);
  }

  private applyPastedDigits(raw: string): void {
    const normalized = raw.replace(/\D/g, "").slice(0, this.length());
    if (!normalized) return;
    const next = emptySlots(this.length());
    for (let i = 0; i < normalized.length; i++) next[i] = normalized[i]!;
    this.digits.set(next);
    this.emit();
    const last = Math.min(normalized.length, this.length()) - 1;
    this.focusIndex(last >= 0 ? last : 0);
    if (normalized.length === this.length()) {
      this.complete.emit(normalized);
    }
  }

  private updateSlot(index: number, char: string): void {
    this.digits.update((d) => {
      const copy = [...d];
      copy[index] = char;
      return copy;
    });
  }

  private emit(): void {
    this.valueChange.emit(this.digits().join(""));
  }

  private focusIndex(i: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const list = this.cells();
    const ref = list[i];
    if (!ref) return;
    const el = ref.nativeElement;
    el.focus();
    el.select();
  }
}

function emptySlots(n: number): string[] {
  return Array.from({ length: n }, () => "");
}
