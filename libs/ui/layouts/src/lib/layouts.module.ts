import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NzLayoutModule } from "ng-zorro-antd/layout";

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
