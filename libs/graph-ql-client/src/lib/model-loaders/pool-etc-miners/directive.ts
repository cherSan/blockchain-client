import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcMinersLoaderComponent } from './component';
import { PoolEtcMinersLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[poolEtcMiners]',
})
export class PoolEtcMinersLoaderDirective extends ModelViewerDirective<PoolEtcMinersLoaderType> {
  constructor(
    protected override parent: PoolEtcMinersLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcMinersLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
