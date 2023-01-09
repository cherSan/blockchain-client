import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcBlocksLoaderComponent } from './component';
import { PoolEtcBlocksLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[poolEtcBlocks]',
})
export class PoolEtcBlocksLoaderDirective extends ModelViewerDirective<PoolEtcBlocksLoaderType> {
  constructor(
    protected override parent: PoolEtcBlocksLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcBlocksLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
