import { Directive, TemplateRef } from '@angular/core';
import { PoolEtcMinerLoaderComponent } from './component';
import { PoolEtcMinerLoaderType, PoolEtcMinerLoaderVariablesType } from "./type";
import { ModelViewerVariablesDirective } from "../variablesx.directive";
@Directive({
  selector: 'ng-template[poolEtcMiner]',
})
export class PoolEtcMinerLoaderDirective extends ModelViewerVariablesDirective<PoolEtcMinerLoaderType, PoolEtcMinerLoaderVariablesType> {
  constructor(
    protected override parent: PoolEtcMinerLoaderComponent,
    protected override template: TemplateRef<{
      $implicit: PoolEtcMinerLoaderType;
    }>
  ) {
    super(parent, template);
  }
}
