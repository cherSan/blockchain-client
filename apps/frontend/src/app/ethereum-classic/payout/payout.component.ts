import { Component } from '@angular/core';
import { ColDef } from "ag-grid-community";
import * as moment from "moment/moment";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {
  ApolloAngularSDK,
  IEtcMinerStatQuery,
  IListenEtcMinerStatSubscription
} from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";
type MinerStat = IEtcMinerStatQuery["etcMinerData"] | IListenEtcMinerStatSubscription['etcMinerData'];
@Component({
  selector: 'payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {
  chartOptions: AgChartOptions = {};
  data: undefined | MinerStat;
  columnDefs: ColDef[] = [
    {
      maxWidth: 160,
      minWidth: 160,
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: (data) => moment(data.value).format('L LTS')
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    },
    {
      maxWidth: 160,
      minWidth: 91200,
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: (data) => data.value.toLocaleString()
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
          this.createChart(data);
        }),
        switchMap(() => this.gql.listenEtcMinerStat({ id })),
        map(response => response.data?.etcMinerData),
        tap(data => {
          this.data = data;
          this.createChart(data);
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
  createChart(data: undefined | MinerStat) {
    if (!data?.paymentCharts) {
      return;
    }
    const startDay = moment(data?.paymentCharts[0].x).startOf('day');
    const endDay = moment().endOf('day');
    const diff = endDay.diff(startDay, 'days');
    const bins: [number, number][] = [[
      startDay.valueOf(),
      startDay.endOf('day').valueOf()
    ]];
    for(let i = 0; i < diff; i++) {
      const startOfNewDay = bins[bins.length - 1][1] + 1;
      const endOfNewDay = moment(startOfNewDay).endOf('day').valueOf();
      bins.push([startOfNewDay, endOfNewDay])
    }
    this.chartOptions = {
      title: {
        text: `Payments`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.paymentCharts,
      series: [
        {
          type: 'histogram',
          xKey: 'x',
          yKey: 'amount',
          xName: 'Date-Time',
          yName: 'Amount',
          bins
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['amount'],
          tick: {
            count: 2
          },
          nice: true
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['x'],
          title: {
            enabled: true,
            text: 'Date-Time',
          },
          tick: {
            count: time.day.every(1)
          }
        }
      ]
    };
  }
}
