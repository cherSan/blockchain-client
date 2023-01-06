import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { EtcPaymentsComponent } from "./etc-payments.component";
import { EtcPayments } from "./etc-payments";
@Directive({
  selector: 'ng-template[etc-payments]'
})
export class EtcPaymentsDirective extends ModelViewerDirective<EtcPayments> {
  constructor(
    protected override parent: EtcPaymentsComponent,
    protected override template: TemplateRef<{$implicit: EtcPayments}>
  ) {
    super(parent, template)
  }
}
