import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerDirective } from "../directive";
import { NewsComponent } from "./news.component";
import { News } from "./news";
@Directive({
  selector: 'ng-template[news]'
})
export class NewsDirective extends ModelViewerDirective<News> {
  constructor(
    protected override parent: NewsComponent,
    protected override template: TemplateRef<{$implicit: News}>
  ) {
    super(parent, template)
  }
}
