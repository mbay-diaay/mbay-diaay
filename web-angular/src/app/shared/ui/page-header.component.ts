import { Component, input } from "@angular/core";

/** En-tête de page — port de PageHeader dans src/components/app/ui-bits.tsx. */
@Component({
  selector: "ui-page-header",
  template: `
    <div class="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div class="min-w-0 max-w-3xl">
        @if (eyebrow()) {
          <div class="eyebrow mb-2">{{ eyebrow() }}</div>
        }
        <h1 class="text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
          {{ title() }}
        </h1>
        @if (description()) {
          <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
            {{ description() }}
          </p>
        }
      </div>
      <div class="flex shrink-0 flex-wrap gap-2">
        <ng-content select="[actions]" />
      </div>
    </div>
  `,
})
export class UiPageHeaderComponent {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
}
