import { TemplateRef } from "@angular/core";
import { ModelViewerVariablesComponent } from "./variables-component";
export class ModelViewerVariablesDirective<T, P> {
  static ngTemplateContextGuard<T, P>(
    dir: ModelViewerVariablesDirective<T, P>,
    ctx: unknown
  ): ctx is null | {$implicit: T} {
    return true;
  }
  constructor(
    protected parent: ModelViewerVariablesComponent<T, P>,
    protected template: TemplateRef<{$implicit: T}>
  ) {
    parent.setTemplate(template);
  }
}
