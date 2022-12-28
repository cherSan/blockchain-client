import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { PieChartOutline, QuestionOutline, DatabaseOutline, InfoCircleOutline } from '@ant-design/icons-angular/icons';

import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PoolLayoutComponent } from './pool-layout/pool-layout.component';
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forChild([
      PieChartOutline,
      QuestionOutline,
      DatabaseOutline,
      InfoCircleOutline
    ]),
    NzTypographyModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzDescriptionsModule,
  ],
  declarations: [
    MainLayoutComponent,
    PoolLayoutComponent,
  ],
  exports: [
    MainLayoutComponent,
    PoolLayoutComponent,
  ]
})
export class LayoutsModule {}
