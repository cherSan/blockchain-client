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
import { LinkRenderComponent } from './link-render/link-render.component';
import { NzButtonModule } from "ng-zorro-antd/button";

@NgModule({
  declarations: [
    GridComponent,
    CoinRenderComponent,
    LinkRenderComponent
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
    NzImageModule,
    NzButtonModule
  ],
  exports: [
    GridComponent,
    CoinRenderComponent,
    LinkRenderComponent
  ]
})
export class GridModule { }
