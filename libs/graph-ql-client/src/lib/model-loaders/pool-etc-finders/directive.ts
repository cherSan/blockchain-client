import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcFindersLoaderComponent } from './component';
import { PoolEtcFindersLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[poolEtcFinders]',
})
export class PoolEtcFindersLoaderDirective extends ModelViewerDirective<PoolEtcFindersLoaderType> {
  constructor(
    protected override parent: PoolEtcFindersLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcFindersLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
