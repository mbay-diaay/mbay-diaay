import { Component, input } from "@angular/core";

import { UiPageHeaderComponent } from "./page-header.component";

/** Placeholder uniforme pour une route M1 pas encore portée en profondeur. */
@Component({
  selector: "ui-stub-page",
  imports: [UiPageHeaderComponent],
  template: `
    <ui-page-header [title]="title()" [description]="description()" />
    <div class="surface p-6 text-sm text-muted-foreground">
      {{ hint() }}
    </div>
  `,
})
export class UiStubPageComponent {
  readonly title = input.required<string>();
  readonly description = input("");
  readonly hint = input(
    "Écran en cours de portage Angular — structure et droits alignés sur React ; contenu détail à suivre.",
  );
}
