import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  PercentPipe,
  TitleCasePipe
} from "@angular/common";

import { LayoutsModule } from "@blockchain_client/ui/layouts";
import {
  CmAssetsHistoryLoaderModule,
  CmMetricsLoaderModule, PoolEtcMinerLoaderModule, PoolEtcMinersLoaderModule, PoolEtcPaymentsLoaderModule,
  PoolEtcStatsLoaderModule
} from "@blockchain_client/graph-ql-client";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTabsModule } from "ng-zorro-antd/tabs";

import { ChartsModule } from "../shared/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";
import { GridModule } from "../shared/grid/grid.module";

import { PoolComponent } from './pool/pool.component';
import { MinersComponent } from './miners/miners.component';
import { WorkersComponent } from './workers/workers.component';
import { RewardsComponent } from './rewards/rewards.component';
import { PayoutComponent } from './payout/payout.component';
import { PaymentsComponent } from './payments/payments.component';
import { MinerComponent } from './miner/miner.component';

import { ChartOptionsPipe } from './pool/chart-options.pipe';
import { PoolInformationChartPipe } from './pool/pool-information-chart.pipe';
import { WorkerChartPipe } from './workers/worker-chart.pipe';
import { ShareChartPipe } from './workers/share-chart.pipe';
import { PayoutChartPipe } from './payout/payout-chart.pipe';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pool',
    pathMatch: 'full'
  },
  {
    path: 'pool',
    component: PoolComponent
  },
  {
    path: 'miners',
    component: MinersComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'miners/:id',
    component: MinerComponent,
    children: [
      {
        path: '',
        redirectTo: 'workers',
        pathMatch: 'full'
      },
      {
        path: 'workers',
        component: WorkersComponent
      },
      {
        path: 'rewards',
        component: RewardsComponent
      },
      {
        path: 'payout',
        component: PayoutComponent
      }
    ]
  }
]
@NgModule({
  declarations: [
    PoolComponent,
    MinersComponent,
    WorkersComponent,
    RewardsComponent,
    PayoutComponent,
    PaymentsComponent,
    ChartOptionsPipe,
    PoolInformationChartPipe,
    MinerComponent,
    WorkerChartPipe,
    ShareChartPipe,
    PayoutChartPipe
  ],
  exports: [
    ChartOptionsPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    LayoutsModule,
    NzCardModule,
    NzAlertModule,
    AsyncPipe,
    ChartsModule,
    NzDescriptionsModule,
    PipesModule,
    NgIf,
    NzGridModule,
    CurrencyPipe,
    NzEmptyModule,
    DatePipe,
    NzCollapseModule,
    NgForOf,
    GridModule,
    DecimalPipe,
    TitleCasePipe,
    NzPageHeaderModule,
    NzIconModule,
    PercentPipe,
    NzTabsModule,
    CmAssetsHistoryLoaderModule,
    CmMetricsLoaderModule,
    PoolEtcStatsLoaderModule,
    PoolEtcMinersLoaderModule,
    PoolEtcPaymentsLoaderModule,
    PoolEtcMinerLoaderModule
  ]
})
export class EthereumClassicModule { }
