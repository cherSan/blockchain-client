import { NgModule } from '@angular/core';
import { NgChartsModule } from "ng2-charts";

import { LineAreaChartComponent } from './line-area-chart/line-area-chart.component';
import { LineChartFormatPipe } from "./line-chart-format.pipe";


@NgModule({
  declarations: [
    LineAreaChartComponent,
    LineChartFormatPipe
  ],
  imports: [
    NgChartsModule
  ],
  exports: [
    LineAreaChartComponent,
    LineChartFormatPipe
  ]
})
export class ChartsModule { }
