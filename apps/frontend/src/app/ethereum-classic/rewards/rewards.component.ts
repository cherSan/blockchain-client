import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {
  ApolloAngularSDK,
  IEtcMinerStatQuery,
  IListenEtcMinerStatSubscription
} from "@blockchain_client/graph-ql-client";
import { ColDef } from "ag-grid-community";
import * as moment from "moment";
type MinerStat = IEtcMinerStatQuery["etcMinerData"] | IListenEtcMinerStatSubscription['etcMinerData'];
@Component({
  selector: 'rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
  data: undefined | MinerStat;
  rewards: {
    m30: number,
    m60: number,
    h12: number,
    h24: number,
    d7: number,
    d30: number
  } = {
    m30: 0,
    m60: 0,
    h12: 0,
    h24: 0,
    d7: 0,
    d30: 0
  };

  columnDefs: ColDef[] = [
    {
      headerName: '',
      maxWidth: 80,
      minWidth: 80,
      field: 'immature',
      valueFormatter: (data) => data.value ? 'Immature' : 'Matured',
      cellClass: cellClassParams => cellClassParams.value ? 'grid-cell-immature' : 'grid-cell-matured'
    },
    {
      headerName: 'Block Hash',
      field: 'blockhash'
    },
    {
      maxWidth: 140,
      minWidth: 140,
      headerName: 'Time Found',
      field: 'timestamp',
      valueFormatter: (data) => moment(data.value).format('L LTS')
    },
    {
      maxWidth: 120,
      minWidth: 120,
      headerName: 'Block Height',
      field: 'blockheight',
      valueFormatter: (data) => data.value.toLocaleString()
    },
    {
      maxWidth: 120,
      minWidth: 120,
      headerName: 'Reward',
      field: 'reward'
    },
    {
      maxWidth: 90,
      minWidth: 90,
      headerName: 'Round Share',
      field: 'percent',
      valueFormatter: (data) => data.value * 100 + '%'
    }
  ]
  userId$ = (this.activeRouter.parent?.params || of({})).pipe(
    map((data) => data["id"])
  )
  stats$: Observable<undefined | MinerStat> = this.userId$.pipe(
    switchMap((id) => {
      if (!id) {
        return of(undefined);
      }
      return this.gql.etcMinerStat({ id }).pipe(
        map(response => response.data?.etcMinerData),
        tap(data => {
          this.data = data;
          this.periods(data);
        }),
        switchMap(() => this.gql.listenEtcMinerStat({ id })),
        map(response => response.data?.etcMinerData),
        tap(data => {
          this.data = data;
          this.periods(data);
        }),
      );
    })
  )
  stateError$ = this.stats$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )
  constructor(
    private activeRouter: ActivatedRoute,
    private gql: ApolloAngularSDK
  ) {

  }

  periods(data: MinerStat | undefined) {
    const now = Date.now();
    const initReward = {
      m30: 0,
      m60: 0,
      h12: 0,
      h24: 0,
      d7: 0,
      d30: 0
    };
    if (data?.rewards) {
      const m30 = now - 1000*60*30;
      const m60 = now - 1000*60*60;
      const h12 = now - 1000*60*60*12;
      const h24 = now - 1000*60*60*24;
      const d7 = now - 1000*60*60*24*7;
      const d30 = now - 1000*60*60*24*30;
      this.rewards = data.rewards.reduce((acc, value) => {
        if (m30 < value.timestamp) acc.m30 += value.reward;
        if (m60 < value.timestamp) acc.m60 += value.reward;
        if (h12 < value.timestamp) acc.h12 += value.reward;
        if (h24 < value.timestamp) acc.h24 += value.reward;
        if (d7 < value.timestamp) acc.d7 += value.reward;
        if (d30 < value.timestamp) acc.d30 += value.reward;
        return acc;
      }, initReward)
    } else {
      this.rewards = initReward;
    }
  }
}
