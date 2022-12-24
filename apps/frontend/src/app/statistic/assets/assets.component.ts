import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap } from "rxjs";
import {
  ApolloAngularSDK,
  IAssetsQuery,
  IListenAssetsSubscription,
} from "@blockchain_client/graph-ql-client";
import { ColDef } from "ag-grid-community";

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
    { field: 'name', filter: true, floatingFilter: true, suppressFiltersToolPanel: true},
    { field: 'symbol', filter: true, floatingFilter: true, suppressFiltersToolPanel: true},
    {
      field: 'supply',
      type: 'ChangeDetection'
    },
    {
      field: 'maxSupply',
      type: 'ChangeDetection'
    },
    {
      field: 'marketCapUsd',
      type: 'ChangeDetection'
    },
    {
      field: 'volumeUsd24Hr',
      type: 'ChangeDetection'
    },
    {
      field: 'priceUsd',
      type: 'ChangeDetection'
    },
    {
      field: 'changePercent24Hr',
      type: 'ChangeDetection',
      cellClass: (params) => {
        return parseFloat(params.value) < 0 ? 'ag-grid-lost-position' : 'ag-grid-win-position'
      }
    },
    {
      field: 'vwap24Hr',
      type: 'ChangeDetection',
      valueFormatter: (params) => {
        return parseFloat(params.value).toFixed(4).toString()
      }
    },
  ];

  data$: Observable<undefined | IAssetsQuery["assets"] | IListenAssetsSubscription["assets"]> = this.gql.assets().pipe(
    map(response => response.data?.assets),
    switchMap(() => this.gql.listenAssets()),
    map(response => response.data?.assets)
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => {
      return of(err);
    })
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
