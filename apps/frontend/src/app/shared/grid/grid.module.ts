import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from "ag-grid-angular";

import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
