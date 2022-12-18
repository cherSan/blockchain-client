import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";
import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { MainPangeComponent } from './main-pange/main-pange.component';
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzInputModule } from "ng-zorro-antd/input";
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { InfoPageComponent } from './info-page/info-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPangeComponent,
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'statistic'
      },
      {
        path: 'statistic',
        component: StatisticPageComponent
      },
      {
        path: 'info',
        component: InfoPageComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    MainPangeComponent,
    StatisticPageComponent,
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutsModule,
    NzMenuModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzSpaceModule,
    NzInputModule
  ]
})
export class HomeModule { }
