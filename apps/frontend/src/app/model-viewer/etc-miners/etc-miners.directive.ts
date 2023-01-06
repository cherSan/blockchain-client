import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { EtcMinersComponent } from "./etc-miners.component";
import { EtcMiners } from "./etc-miners";
@Directive({
  selector: 'ng-template[etc-miners]'
})
export class EtcMinersDirective extends ModelViewerDirective<EtcMiners> {
  constructor(
    protected override parent: EtcMinersComponent,
    protected override template: TemplateRef<{$implicit: EtcMiners}>
  ) {
    super(parent, template)
  }
}
