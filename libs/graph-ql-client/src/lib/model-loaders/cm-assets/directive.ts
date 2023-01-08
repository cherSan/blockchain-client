import { Directive, TemplateRef } from '@angular/core';
import { CmAssetsLoaderComponent } from './component';
import { CmAssetsLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[cmAssets]',
})
export class CmAssetsLoaderDirective extends ModelViewerDirective<CmAssetsLoaderType> {
  constructor(
    protected override parent: CmAssetsLoaderComponent,
    protected override template: TemplateRef<{ $implicit: CmAssetsLoaderType }>
  ) {
    super(parent, template);
  }
}
