import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddOutline, LoginOutline, UsergroupAddOutline } from "@ant-design/icons-angular/icons";
import { RouterModule, Routes } from "@angular/router";

import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";


import { MainPangeComponent } from './main-pange/main-pange.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { StatsModule } from "../stats/stats.module";

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
    StatsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzInputModule,
    NzSpaceModule,
    NzIconModule.forChild([
      LoginOutline,
      UserAddOutline,
      UsergroupAddOutline
    ]),
  ]
})
export class HomeModule { }
