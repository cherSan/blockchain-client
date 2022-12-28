import { Component } from '@angular/core';
import { catchError, forkJoin, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEtcPoolStatsQuery,
  IListenEtcPoolStatsSubscription
} from "@blockchain_client/graph-ql-client";
type PoolData = IEtcPoolStatsQuery["etcPoolStats"] | IListenEtcPoolStatsSubscription["etcPoolStats"];
@Component({
  selector: 'pool-information',
  templateUrl: './pool-information.component.html',
  styleUrls: ['./pool-information.component.css']
})
export class PoolInformationComponent {
  data: PoolData | undefined;

  private data$: Observable<PoolData |  undefined> = this.gql.etcPoolStats()
    .pipe(
      map((response) => {
        return response.data.etcPoolStats
      }),
      tap(data => {
        this.data = data;
      }),
      switchMap(() =>  this.gql.listenEtcPoolStats()),
      map((response) => {
        return response.data?.etcPoolStats
      }),
      tap(data => {
        this.data = data;
      }),
    )
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
