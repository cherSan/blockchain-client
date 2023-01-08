import { Directive, TemplateRef } from '@angular/core';
import { CmAssetsHistoryLoaderComponent } from './component';
import { CmAssetsHistoryLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[cmAssetsHistory]',
})
export class CmAssetsHistoryLoaderDirective extends ModelViewerDirective<CmAssetsHistoryLoaderType> {
  constructor(
    protected override parent: CmAssetsHistoryLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: CmAssetsHistoryLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
