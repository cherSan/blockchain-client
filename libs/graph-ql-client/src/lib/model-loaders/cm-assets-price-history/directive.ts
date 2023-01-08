import { Directive, TemplateRef } from '@angular/core';
import { CmAssetsPriceHistoryLoaderComponent } from './component';
import { CmAssetsPriceHistoryLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[cmAssetsPriceHistory]',
})
export class CmAssetsPriceHistoryLoaderDirective extends ModelViewerDirective<CmAssetsPriceHistoryLoaderType> {
  constructor(
    protected override parent: CmAssetsPriceHistoryLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: CmAssetsPriceHistoryLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
