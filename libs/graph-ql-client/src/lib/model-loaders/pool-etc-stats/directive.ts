import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcStatsLoaderComponent } from './component';
import { PoolEtcStatsLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[poolEtcStats]',
})
export class PoolEtcStatsLoaderDirective extends ModelViewerDirective<PoolEtcStatsLoaderType> {
  constructor(
    protected override parent: PoolEtcStatsLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcStatsLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
