import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AsyncPipe, CurrencyPipe, DatePipe, NgForOf, NgIf } from "@angular/common";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzGridModule } from "ng-zorro-antd/grid";

import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { ChartsModule } from "../shared/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";

import { PoolComponent } from './pool/pool.component';
import { BlocksComponent } from './blocks/blocks.component';
import { PoolChartComponent } from './pool-chart/pool-chart.component';
import { PoolInformationComponent } from './pool-information/pool-information.component';
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { MinersComponent } from './miners/miners.component';
import { GridModule } from "../shared/grid/grid.module";
import { MinerDetailComponent } from './miner-detail/miner-detail.component';

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
    path: 'blocks',
    component: BlocksComponent
  },
  {
    path: 'miners',
    component: MinersComponent
  },
  {
    path: 'miners/:id',
    component: MinerDetailComponent
  }
]

@NgModule({
  declarations: [
    PoolComponent,
    BlocksComponent,
    PoolChartComponent,
    PoolInformationComponent,
    MinersComponent,
    MinerDetailComponent,
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
    GridModule
  ]
})
export class EthereumClassicModule { }
