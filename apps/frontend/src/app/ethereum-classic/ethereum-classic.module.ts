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
  CmMetricsLoaderModule,
  PoolEtcBlocksLoaderModule, PoolEtcFindersLoaderModule,
  PoolEtcMinerLoaderModule,
  PoolEtcMinersLoaderModule,
  PoolEtcPaymentsLoaderModule,
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

import { PoolInformationChartPipe } from './pool/pool-information-chart.pipe';
import { WorkerChartPipe } from './workers/worker-chart.pipe';
import { ShareChartPipe } from './workers/share-chart.pipe';
import { PayoutChartPipe } from './payout/payout-chart.pipe';
import { BlocksComponent } from './blocks/blocks.component';
import { ChartPoolEtcBlocksOptionsPipe } from './blocks/chart-pool-etc-blocks-options.pipe';
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FindersComponent } from './finders/finders.component';
import { NzStatisticModule } from "ng-zorro-antd/statistic";

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
    path: 'finders',
    component: FindersComponent
  },
  {
    path: 'blocks',
    component: BlocksComponent
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
    PoolInformationChartPipe,
    MinerComponent,
    WorkerChartPipe,
    ShareChartPipe,
    PayoutChartPipe,
    BlocksComponent,
    ChartPoolEtcBlocksOptionsPipe,
    FindersComponent
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
    PoolEtcMinerLoaderModule,
    PoolEtcBlocksLoaderModule,
    NzTypographyModule,
    PoolEtcFindersLoaderModule,
    NzStatisticModule
  ]
})
export class EthereumClassicModule { }
