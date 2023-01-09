import { Directive, TemplateRef } from '@angular/core';
import { CmMetricsLoaderComponent } from './component';
import { CmMetricsLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[cmMetrics]',
})
export class CmMetricsLoaderDirective extends ModelViewerDirective<CmMetricsLoaderType> {
  constructor(
    protected override parent: CmMetricsLoaderComponent,
    protected override template: TemplateRef<{ $implicit: CmMetricsLoaderType }>
  ) {
    super(parent, template);
  }
}
