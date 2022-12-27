import { NgModule } from '@angular/core';
import { AgChartsAngularModule } from "ag-charts-angular";
import { AsyncPipe, NgIf } from "@angular/common";

import { NzAlertModule } from "ng-zorro-antd/alert";

import { ChartComponent } from './chart/chart.component';
import { CoinHistoryChartComponent } from './coin-history-chart/coin-history-chart.component';

@NgModule({
  declarations: [
    ChartComponent,
    CoinHistoryChartComponent,
  ],
  imports: [
    AgChartsAngularModule,
    NzAlertModule,
    NgIf,
    AsyncPipe
  ],
  exports: [
    ChartComponent,
    CoinHistoryChartComponent
  ]
})
export class ChartsModule { }
