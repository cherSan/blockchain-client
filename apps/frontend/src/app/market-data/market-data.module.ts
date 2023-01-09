import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe, JsonPipe,
  NgForOf,
  NgIf,
  PercentPipe,
  TitleCasePipe
} from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {
  AssetsLoaderModule,
  CmAssetsPriceHistoryLoaderModule,
  NewsDataLoaderModule
} from "@blockchain_client/graph-ql-client";

import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzListModule } from "ng-zorro-antd/list";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzBackTopModule } from "ng-zorro-antd/back-top";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { NzCardModule } from "ng-zorro-antd/card";

import { GridModule } from "../shared/grid/grid.module";
import { PipesModule } from "../pipes/pipes.module";

import { GetRatesPipe } from "./pipes/get-rates.pipe";

import { AssetsComponent } from "./assets/assets.component";
import { MainRatesComponent } from "./main-rates/main-rates.component";
import { NewsComponent } from "./news/news.component";
import { MarketDataComponent } from './market-data/market-data.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { ColumnDefPipe } from './coin-details/column-def.pipe';
import { PairsPipe } from './coin-details/pairs.pipe';
import { CurrentAssetPipe } from './coin-details/current-asset.pipe';
import { PricesComponent } from './prices/prices.component';
import { ChartsModule } from "../shared/charts/charts.module";
import { ChartOptionsPipe } from './prices/chart-options.pipe';


const routes: Routes = [
  {
    path: '',
    component: MarketDataComponent,
  },
  {
    path: ':id',
    component: CoinDetailsComponent
  }
]
@NgModule({
  declarations: [
    AssetsComponent,
    MainRatesComponent,
    GetRatesPipe,
    NewsComponent,
    MarketDataComponent,
    CoinDetailsComponent,
    ColumnDefPipe,
    PairsPipe,
    CurrentAssetPipe,
    PricesComponent,
    ChartOptionsPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    GridModule,
    DatePipe,
    AsyncPipe,
    NgIf,
    NgForOf,
    NzAlertModule,
    NzGridModule,
    NzStatisticModule,
    NzListModule,
    NzTagModule,
    NzPaginationModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzEmptyModule,
    NzIconModule,
    NzImageModule,
    DecimalPipe,
    CurrencyPipe,
    PercentPipe,
    PipesModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzBackTopModule,
    NzCarouselModule,
    NzCardModule,
    TitleCasePipe,
    JsonPipe,
    NewsDataLoaderModule,
    AssetsLoaderModule,
    CmAssetsPriceHistoryLoaderModule,
    ChartsModule
  ]
})
export class MarketDataModule { }
