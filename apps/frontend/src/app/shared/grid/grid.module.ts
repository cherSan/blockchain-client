import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from "ag-grid-angular";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBadgeModule } from "ng-zorro-antd/badge";

import { GridComponent } from './grid/grid.component';
import { CoinRenderComponent } from './coin-render/coin-render.component';
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzImageModule } from "ng-zorro-antd/image";

@NgModule({
  declarations: [
    GridComponent,
    CoinRenderComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    NzCardModule,
    NzAlertModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzBadgeModule,
    NzStatisticModule,
    NzIconModule,
    NzImageModule
  ],
  exports: [
    GridComponent,
    CoinRenderComponent
  ]
})
export class GridModule { }
