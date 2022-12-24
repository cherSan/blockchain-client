import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from "ag-grid-angular";

import { GridComponent } from './grid/grid.component';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBadgeModule } from "ng-zorro-antd/badge";

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    NzCardModule,
    NzAlertModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzBadgeModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
