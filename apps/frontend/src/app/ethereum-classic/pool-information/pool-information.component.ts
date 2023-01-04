import { Component, Input } from "@angular/core";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEtcPoolStatsQuery,
  IListenEtcPoolStatsSubscription
} from "@blockchain_client/graph-ql-client";
import * as moment from "moment";
type PoolData = IEtcPoolStatsQuery["etcPoolStats"] | IListenEtcPoolStatsSubscription["etcPoolStats"];
@Component({
  selector: 'pool-information',
  templateUrl: './pool-information.component.html',
  styleUrls: ['./pool-information.component.css']
})
export class PoolInformationComponent {
  public data: PoolData | undefined;
  public bestHeight?: number;
  public bestDifficulty?: number;
  public updateDate?: string;
  @Input()
  difficulty?: number
  @Input()
  rewardBlock?: number
  private data$: Observable<PoolData |  undefined> = this.gql.etcPoolStats()
    .pipe(
      map((response) => response.data.etcPoolStats),
      tap(data => {
        this.data = data;
        this.updateDate = moment(data?.now).format('L LTS');
        this.bestHeight = data.nodes
          .reduce((accum, value) => accum < parseFloat(value.height) ? parseFloat(value.height) : accum, 0);
        this.bestDifficulty = data.nodes
          .reduce((accum, value) => accum < parseFloat(value.difficulty) ? parseFloat(value.difficulty) : accum, 0);
      }),
      switchMap(() =>  this.gql.listenEtcPoolStats()),
      map((response) => response.data?.etcPoolStats),
      tap(data => {
        this.data = data;
        this.updateDate = moment((data?.now || 0) ).format('L LTS');
        this.bestHeight = data?.nodes
          .reduce((accum, value) => accum < parseFloat(value.height) ? parseFloat(value.height) : accum, 0);
        this.bestDifficulty = data?.nodes
          .reduce((accum, value) => accum < parseFloat(value.difficulty) ? parseFloat(value.difficulty) : accum, 0);
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

  tracker(index: number, node: any) {
    return node.name
  }
}
