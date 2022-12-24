import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from "ag-grid-angular";

import { GridComponent } from './grid/grid.component';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzAlertModule } from "ng-zorro-antd/alert";

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    NzCardModule,
    NzAlertModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
