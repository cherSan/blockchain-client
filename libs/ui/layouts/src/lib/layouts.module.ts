import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from "ng-zorro-antd/layout";

import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule
  ],
  declarations: [
    MainLayoutComponent
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutsModule {}
