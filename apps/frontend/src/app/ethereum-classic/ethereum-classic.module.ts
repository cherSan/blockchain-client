import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzGridModule } from "ng-zorro-antd/grid";

import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { ChartsModule } from "../shared/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";

import { PoolComponent } from './pool/pool.component';
import { BlocksComponent } from './blocks/blocks.component';
import { EthHistoryGraphComponent } from "./eth-history-graph/eth-history-graph.component";
import { MainStatsComponent } from "./main-stats/main-stats.component";
import { PoolHashrateGraphComponent } from "./pool-hashrate-graph/pool-hashrate-graph.component";
import { DifficultyGraphComponent } from './difficulty-graph/difficulty-graph.component';

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
  }
]

@NgModule({
  declarations: [
    PoolComponent,
    BlocksComponent,
    EthHistoryGraphComponent,
    MainStatsComponent,
    PoolHashrateGraphComponent,
    DifficultyGraphComponent,
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
    CurrencyPipe
  ]
})
export class EthereumClassicModule { }
