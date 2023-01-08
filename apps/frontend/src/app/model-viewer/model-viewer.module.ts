import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from "@angular/common";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzResultModule } from "ng-zorro-antd/result";

import { ModelViewerComponent } from "./components";

import { EtcMinersComponent } from "./etc-miners/etc-miners.component";
import { EtcMinersDirective } from "./etc-miners/etc-miners.directive";
import { EtcPaymentsComponent } from "./etc-payments/etc-payments.component";
import { EtcPaymentsDirective } from "./etc-payments/etc-payments.directive";
@NgModule({
  declarations: [
    ModelViewerComponent,
    EtcMinersComponent,
    EtcMinersDirective,
    EtcPaymentsComponent,
    EtcPaymentsDirective
  ],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule
  ],
  exports: [
    EtcMinersComponent,
    EtcMinersDirective,
    EtcPaymentsComponent,
    EtcPaymentsDirective
  ]
})
export class ModelViewerModule { }
