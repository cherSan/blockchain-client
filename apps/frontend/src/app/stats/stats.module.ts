import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsergroupAddOutline } from '@ant-design/icons-angular/icons';

import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzIconModule } from "ng-zorro-antd/icon";

import { MainStatsComponent } from './main-stats/main-stats.component';


@NgModule({
  declarations: [
    MainStatsComponent
  ],
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzGridModule,
    NzStatisticModule,
    NzCollapseModule,
    NzCardModule,
    NzIconModule.forChild([
      UsergroupAddOutline
    ])
  ],
  exports: [
    MainStatsComponent
  ]
})
export class StatsModule { }
