import { NgModule } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzStatisticModule } from "ng-zorro-antd/statistic";

import { MiningDataComponent } from './mining-data/mining-data.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';

import { GridModule } from "../shared/grid/grid.module";
import { ChartsModule } from "../shared/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";
import { ModelViewerModule } from "../model-viewer/model-viewer.module";

const routes: Routes = [
  {
    path: '',
    component: MiningDataComponent,
  },
  {
    path: ':coin/:algo',
    component: CoinDetailsComponent
  }
]

@NgModule({
  declarations: [
    MiningDataComponent,
    CoinDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NzGridModule,
    AsyncPipe,
    GridModule,
    DatePipe,
    ChartsModule,
    NzCardModule,
    NzAlertModule,
    NgIf,
    NzEmptyModule,
    NzPageHeaderModule,
    NzIconModule,
    NzImageModule,
    NzTagModule,
    NzStatisticModule,
    PipesModule,
    ModelViewerModule
  ]
})
export class MiningDataModule { }
