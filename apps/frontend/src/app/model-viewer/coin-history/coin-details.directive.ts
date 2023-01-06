import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { CoinDetailsComponent } from "./coin-details.component";
import { Coin } from "./coin-details";
@Directive({
  selector: 'ng-template[coin]'
})
export class CoinDetailsDirective extends ModelViewerDirective<Coin> {
  constructor(
    protected override parent: CoinDetailsComponent,
    protected override template: TemplateRef<{$implicit: Coin}>
  ) {
    super(parent, template)
  }
}
