import { Component } from '@angular/core';
import { AgChartOptions, time } from "ag-charts-community";
import { ColDef } from "ag-grid-community";
import * as moment from "moment/moment";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEtcMinerStatQuery,
  IListenEtcMinerStatSubscription,
} from "@blockchain_client/graph-ql-client";
import { ActivatedRoute } from "@angular/router";
import { siSymbol } from "../../utils/si-symbol";

type MinerStat = IEtcMinerStatQuery["etcMinerData"] | IListenEtcMinerStatSubscription['etcMinerData'];
@Component({
  selector: 'workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent {

  data: undefined | MinerStat;
  workerChartOptions: AgChartOptions = {};
  shareChartOptions: AgChartOptions = {};
  columnDefs: ColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'hr',
      headerName: 'Hashrate (rough, short average)',
      type: 'ChangeDetection',
    },
    {
      field: 'hr2',
      headerName: 'Hashrate (accurate, long average)',
      type: 'ChangeDetection',
    },
    {
      field: 'blocks',
      type: 'ChangeDetection',
      maxWidth: 60
    },
    {
      field: 'valid',
      headerName: 'Valid / Stale / Invalid 24h',
      type: 'ChangeDetection',
      maxWidth: 140,
      valueFormatter: params => {
        return `${params.data.valid} / ${params.data.stale} / ${params.data.invalid}`
      }
    },
    {
      field: 'lastBeat',
      headerName: 'Last Share',
      valueFormatter: params => moment(params.value * 1000).fromNow()
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
          this.workerChart(data);
          this.shareChart(data);
        }),
        switchMap(() => this.gql.listenEtcMinerStat({ id })),
        map(response => response.data?.etcMinerData),
        tap(data => {
          this.data = data;
          this.workerChart(data);
          this.shareChart(data);
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
  workerChart(data?: MinerStat) {
    if (!data) {
      this.workerChartOptions = {};
    }
    this.workerChartOptions = {
      title: {
        text: `Workers Hashrate`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.minerCharts,
      series: [
        {
          xKey: 'x',
          yKey: 'minerHash',
          xName: 'Date-Time',
          yName: 'Miner Hashrate',
        },
        {
          xKey: 'x',
          yKey: 'minerLargeHash',
          xName: 'Date-Time',
          yName: 'Lage Hashrate',
        },
        {
          xKey: 'x',
          yKey: 'workerOnline',
          xName: 'Date-Time',
          yName: 'Workers',
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['minerHash', 'minerLargeHash'],
          title: {
            enabled: true,
            text: 'Workers Hashrate'
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            },
          },
        },
        {
          type: 'number',
          position: 'right',
          keys: ['workerOnline'],
          title: {
            enabled: true,
            text: 'Workers Online',
          }
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
            count: time.minute.every(2)
          }
        }
      ]
    };
  }
  shareChart(data?: MinerStat) {
    if (!data) {
      this.shareChartOptions = {};
    }
    this.shareChartOptions = {
      title: {
        text: `Share`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.shareCharts,
      series: [
        {
          type: 'column',
          xKey: 'x',
          yKey: 'valid',
          xName: 'Date-Time',
          yName: 'Valid Share',
          stacked: true
        },
        {
          type: 'column',
          xKey: 'x',
          yKey: 'stale',
          xName: 'Date-Time',
          yName: 'Stacked',
          stacked: true,
        },
        {
          xKey: 'x',
          yKey: 'workerOnline',
          xName: 'Date-Time',
          yName: 'Workers',
          marker: {
            enabled: false
          }
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['valid', 'stale'],
          title: {
            enabled: true,
            text: 'Valid Share'
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['workerOnline'],
          title: {
            enabled: true,
            text: 'Workers Online / Stale',
          }
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
            count: time.minute.every(2)
          }
        }
      ]
    };
  }
}
