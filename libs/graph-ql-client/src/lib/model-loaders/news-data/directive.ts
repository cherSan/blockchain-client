import { Directive, TemplateRef } from '@angular/core';
import { NewsDataLoaderComponent } from './component';
import { NewsDataLoaderType } from './type';
import { ModelViewerDirective } from '../directive';
@Directive({
  selector: 'ng-template[newsData]',
})
export class NewsDataLoaderDirective extends ModelViewerDirective<NewsDataLoaderType> {
  constructor(
    protected override parent: NewsDataLoaderComponent,
    protected override template: TemplateRef<{ $implicit: NewsDataLoaderType }>
  ) {
    super(parent, template);
  }
}
