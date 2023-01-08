import { NgModule } from '@angular/core';
import { AgChartsAngularModule } from "ag-charts-angular";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";

import { NzAlertModule } from "ng-zorro-antd/alert";

import { ChartComponent } from './chart/chart.component';
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { ModelViewerModule } from "../../model-viewer/model-viewer.module";

@NgModule({
  declarations: [
    ChartComponent
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
    ChartComponent
  ]
})
export class ChartsModule { }
