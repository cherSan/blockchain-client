import { NgModule } from '@angular/core';
import { AgChartsAngularModule } from "ag-charts-angular";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";

import { NzAlertModule } from "ng-zorro-antd/alert";

import { ChartComponent } from './chart/chart.component';
import { CoinHistoryChartComponent } from './coin-history-chart/coin-history-chart.component';
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { ModelViewerModule } from "../../model-viewer/model-viewer.module";
import { CoinHistoryDataToOptionsPipe } from './pipes/coin-history-data-to-options.pipe';

@NgModule({
  declarations: [
    ChartComponent,
    CoinHistoryChartComponent,
    CoinHistoryDataToOptionsPipe,
  ],
  imports: [
    AgChartsAngularModule,
    NzAlertModule,
    NgIf,
    AsyncPipe,
    NzEmptyModule,
    JsonPipe,
    ModelViewerModule
  ],
  exports: [
    ChartComponent,
    CoinHistoryChartComponent
  ]
})
export class ChartsModule { }
