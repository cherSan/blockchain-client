import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { CoinsDetailsComponent } from "./coins-details.component";
import { Coins } from "./coins-details";
@Directive({
  selector: 'ng-template[coins]'
})
export class CoinsDetailsDirective extends ModelViewerDirective<Coins> {
  constructor(
    protected override parent: CoinsDetailsComponent,
    protected override template: TemplateRef<{$implicit: Coins}>
  ) {
    super(parent, template)
  }
}
