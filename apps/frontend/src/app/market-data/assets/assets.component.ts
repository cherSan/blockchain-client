import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IAssetsQuery,
  IListenAssetsSubscription,
} from "@blockchain_client/graph-ql-client";
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";

type Assets = IAssetsQuery["assets"] | IListenAssetsSubscription["assets"];
@Component({
  selector: 'assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {

  public columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    {
      field: 'rank',
      type: 'Number',
      sort: 'asc',
      sortIndex: 1,
      hide: true,
      comparator: (valueA, valueB) => {
        return parseFloat(valueA) - parseFloat(valueB)
      }
    },
    {
      field: 'name',
      filter: false,
      width: 170,
      minWidth: 170,
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        params: {
          value: ['symbol', 'name']
        },
        component: CoinRenderComponent,
      })
    },
    {
      minWidth: 90,
      field: 'priceUsd',
      type: 'Price',
      headerName: 'Price (USD)'
    },
    {
      minWidth: 90,
      field: 'changePercent24Hr',
      type: 'ChangeDetection',
      cellClass: (params) => {
        return parseFloat(params.value) < 0 ? 'ag-grid-lost-position' : 'ag-grid-win-position'
      },
      headerName: 'Change (24hr)'
    },
    {
      minWidth: 90,
      field: 'marketCapUsd',
      type: 'ChangeDetection',
      headerName: 'Market Cap (USD)'
    },
    {
      minWidth: 90,
      field: 'vwap24Hr',
      type: 'ChangeDetection',
      headerName: 'VWAP (24hr)'
    },
    {
      minWidth: 90,
      field: 'volumeUsd24Hr',
      type: 'ChangeDetection',
      headerName: 'Volume (24hr)'
    },
  ];

  public data: undefined | Assets;

  data$: Observable<undefined | Assets> = this.gql.assets().pipe(
    map(response => response.data?.assets),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenAssets()),
    map(response => response.data?.assets),
    tap(data => this.data = data),
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  constructor(
    private gql: ApolloAngularSDK,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  onRowClick($event: RowClickedEvent<Assets["data"][number]>) {
    return this.router.navigate([$event.data?.symbol], {relativeTo: this.activeRoute})
  }
}
