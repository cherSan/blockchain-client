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
import { NzIconModule } from "ng-zorro-antd/icon";
import { UserAddOutline, LoginOutline } from '@ant-design/icons-angular/icons';

import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCollapseModule } from "ng-zorro-antd/collapse";

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
    NzInputModule,
    NzIconModule.forChild([
      LoginOutline,
      UserAddOutline
    ]),
    NzGridModule,
    NzCollapseModule
  ]
})
export class HomeModule { }
