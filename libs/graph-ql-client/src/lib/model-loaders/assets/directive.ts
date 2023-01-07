import { Directive, TemplateRef } from '@angular/core';
import { AssetsLoaderComponent } from './component';
import { AssetsLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[assets]',
})
export class AssetsLoaderDirective extends ModelViewerDirective<AssetsLoaderType> {
  constructor(
    protected override parent: AssetsLoaderComponent,
    protected override template: TemplateRef<{ $implicit: AssetsLoaderType }>
  ) {
    super(parent, template);
  }
}
