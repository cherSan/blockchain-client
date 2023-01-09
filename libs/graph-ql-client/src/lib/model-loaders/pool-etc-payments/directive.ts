import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcPaymentsLoaderComponent } from './component';
import { PoolEtcPaymentsLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[poolEtcPayments]',
})
export class PoolEtcPaymentsLoaderDirective extends ModelViewerDirective<PoolEtcPaymentsLoaderType> {
  constructor(
    protected override parent: PoolEtcPaymentsLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcPaymentsLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
