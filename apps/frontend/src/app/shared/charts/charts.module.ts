import { NgModule } from '@angular/core';
import { NgChartsModule } from "ng2-charts";

import { LineAreaChartComponent } from './line-area-chart/line-area-chart.component';


@NgModule({
  declarations: [
    LineAreaChartComponent
  ],
  imports: [
    NgChartsModule
  ],
  exports: [
    LineAreaChartComponent
  ]
})
export class ChartsModule { }
