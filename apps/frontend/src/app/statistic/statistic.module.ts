import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";

import { ChartsModule } from "../shared/charts/charts.module";
import { MenuModule } from "../shared/menu/menu.module";

import { PageComponent } from './page/page.component';
import { PoolHashrateGraphComponent } from './pool-hashrate-graph/pool-hashrate-graph.component';
import { MainStatsComponent } from './main-stats/main-stats.component';
import { GridModule } from "../shared/grid/grid.module";
import { RatesComponent } from './rates/rates.component';
import { AssetsComponent } from './assets/assets.component';
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzAlertModule } from "ng-zorro-antd/alert";

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  }
]

@NgModule({
  declarations: [
    PageComponent,
    PoolHashrateGraphComponent,
    MainStatsComponent,
    RatesComponent,
    AssetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutsModule,
    MenuModule,
    ChartsModule,
    NzCardModule,
    NzGridModule,
    NzDescriptionsModule,
    GridModule,
    NzBadgeModule,
    NzAlertModule
  ]
})
export class StatisticModule { }
