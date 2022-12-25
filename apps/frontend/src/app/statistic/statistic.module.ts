import { NgModule } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { NzGridModule } from "ng-zorro-antd/grid";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzStatisticModule } from "ng-zorro-antd/statistic";

import { GridModule } from "../shared/grid/grid.module";

import { GetRatesPipe } from './get-rates.pipe';

import { PageComponent } from './page/page.component';
import { RatesComponent } from './rates/rates.component';
import { AssetsComponent } from './assets/assets.component';
import { MainRatesComponent } from './main-rates/main-rates.component';
import { NewsComponent } from './news/news.component';
import { NzListModule } from "ng-zorro-antd/list";
import { NzTagModule } from "ng-zorro-antd/tag";

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  }
]

@NgModule({
  declarations: [
    PageComponent,
    RatesComponent,
    AssetsComponent,
    MainRatesComponent,
    GetRatesPipe,
    NewsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    GridModule,
    DatePipe,
    AsyncPipe,
    NzAlertModule,
    NzGridModule,
    NzStatisticModule,
    NgIf,
    NzListModule,
    NgForOf,
    NzTagModule
  ]
})
export class StatisticModule { }
