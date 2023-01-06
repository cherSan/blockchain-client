import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { CoinHistoryComponent } from "./coin-history.component";
import { CoinHistory } from "./coin-history";
@Directive({
  selector: 'ng-template[coin-history]'
})
export class CoinHistoryDirective extends ModelViewerDirective<CoinHistory> {
  constructor(
    protected override parent: CoinHistoryComponent,
    protected override template: TemplateRef<{$implicit: CoinHistory}>
  ) {
    super(parent, template)
  }
}
