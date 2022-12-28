import { Component } from '@angular/core';
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ApolloAngularSDK, IEtcMinersQuery, IListenEtcMinersSubscription } from "@blockchain_client/graph-ql-client";
import { ActivatedRoute, Router } from "@angular/router";
import { siSymbol } from "../../utils/si-symbol";
type Miners = IEtcMinersQuery['etcMinersList'] | IListenEtcMinersSubscription['etcMinersList'];
@Component({
  selector: 'miners',
  templateUrl: './miners.component.html',
  styleUrls: ['./miners.component.css']
})
export class MinersComponent {
  public data: undefined | Miners;
  public columnDefs: ColDef[] = [
    {
      maxWidth: 40,
      field: '',
      valueFormatter: () => '',
      cellClass: (node) => node.data.offline ? 'red-cell' : 'green-cell'
    },
    { field: 'id', minWidth: 300, headerName: '' },
    {
      minWidth: 120,
      maxWidth: 120,
      field: 'hr',
      headerName: 'Hashrate',
      valueFormatter: (node) => siSymbol(node.data.hr, 'H/s')
    },
    {
      minWidth: 70,
      maxWidth: 70,
      field: 'blocks',
      type: 'ChangeDetection',
      headerName: 'Blocks',
    },
    {
      minWidth: 180,
      field: 'lastBeat',
      headerName: 'Last Beat',
      valueFormatter: (node) => {
        const date = new Date(node.data.lastBeat * 1000)
        return date.toUTCString()
      }
    }
  ]

  private data$: Observable<undefined | Miners> = this.gql.etcMiners().pipe(
    map(response => response.data?.etcMinersList),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenEtcMiners()),
    map(response => response.data?.etcMinersList),
    tap(data => this.data = data),
  );

  public error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  constructor(
    private gql: ApolloAngularSDK,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onRowClick($event: RowClickedEvent<Miners["miners"][number]>) {
    return this.router.navigate([$event.data?.id], {relativeTo: this.activeRoute})
  }
}
