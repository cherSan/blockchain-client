import { Directive, TemplateRef } from '@angular/core';
import { CmAssetsLastPriceLoaderComponent } from './component';
import { CmAssetsLastPriceLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[cmAssetsLastPrice]',
})
export class CmAssetsLastPriceLoaderDirective extends ModelViewerDirective<CmAssetsLastPriceLoaderType> {
  constructor(
    protected override parent: CmAssetsLastPriceLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: CmAssetsLastPriceLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
