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

import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzGridModule } from "ng-zorro-antd/grid";

import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { ChartsModule } from "../shared/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";

import { PoolComponent } from './pool/pool.component';
import { PoolChartComponent } from './pool-chart/pool-chart.component';
import { PoolInformationComponent } from './pool-information/pool-information.component';
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { MinersComponent } from './miners/miners.component';
import { GridModule } from "../shared/grid/grid.module";
import { MinerDetailComponent } from './miner-detail/miner-detail.component';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzIconModule } from "ng-zorro-antd/icon";
import { WorkersComponent } from './workers/workers.component';
import { RewardsComponent } from './rewards/rewards.component';
import { PayoutComponent } from './payout/payout.component';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { PaymentsComponent } from './payments/payments.component';
import { ModelViewerModule } from "../model-viewer/model-viewer.module";

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
    component: MinerDetailComponent,
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
    PoolChartComponent,
    PoolInformationComponent,
    MinersComponent,
    MinerDetailComponent,
    WorkersComponent,
    RewardsComponent,
    PayoutComponent,
    PaymentsComponent,
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
    ModelViewerModule
  ]
})
export class EthereumClassicModule { }
