import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from "@angular/common";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzResultModule } from "ng-zorro-antd/result";

import { ModelViewerComponent } from "./components";

import { CoinHistoryComponent } from "./coin-details/coin-history.component";
import { CoinHistoryDirective } from "./coin-details/coin-history.directive";
import { CoinsDetailsComponent } from "./coins-details/coins-details.component";
import { CoinsDetailsDirective } from "./coins-details/coins-details.directive";
import { CoinDetailsComponent } from "./coin-history/coin-details.component";
import { CoinDetailsDirective } from "./coin-history/coin-details.directive";
import { EtcMinersComponent } from "./etc-miners/etc-miners.component";
import { EtcMinersDirective } from "./etc-miners/etc-miners.directive";
import { EtcPaymentsComponent } from "./etc-payments/etc-payments.component";
import { EtcPaymentsDirective } from "./etc-payments/etc-payments.directive";
@NgModule({
  declarations: [
    ModelViewerComponent,
    CoinHistoryComponent,
    CoinHistoryDirective,
    CoinsDetailsComponent,
    CoinsDetailsDirective,
    CoinDetailsComponent,
    CoinDetailsDirective,
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
    CoinHistoryComponent,
    CoinHistoryDirective,
    CoinsDetailsComponent,
    CoinsDetailsDirective,
    CoinDetailsComponent,
    CoinDetailsDirective,
    EtcMinersComponent,
    EtcMinersDirective,
    EtcPaymentsComponent,
    EtcPaymentsDirective
  ]
})
export class ModelViewerModule { }
