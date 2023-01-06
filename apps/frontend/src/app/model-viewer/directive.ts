import { Directive, TemplateRef } from "@angular/core";
import { ModelViewerComponent } from "./components";
@Directive()
export class ModelViewerDirective<T> {
  static ngTemplateContextGuard<T>(
    dir: ModelViewerDirective<T>,
    ctx: unknown
  ): ctx is null | {$implicit: T} {
    return true;
  }

  constructor(
    protected parent: ModelViewerComponent<T>,
    protected template: TemplateRef<{$implicit: T}>
  ) {
    parent.setTemplate(template);
  }
}
