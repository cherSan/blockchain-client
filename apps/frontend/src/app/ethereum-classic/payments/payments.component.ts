import { Component } from '@angular/core';
import {
  ApolloAngularSDK,
  IEtcMinerPaymentsListenSubscription,
  IEtcMinerPaymentsQuery
} from "@blockchain_client/graph-ql-client";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ColDef } from "ag-grid-community";
import * as moment from "moment";
type Payments = IEtcMinerPaymentsQuery["etcMinersPaymentsData"] | IEtcMinerPaymentsListenSubscription["etcMinersPaymentsData"];
@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  public data: Payments | undefined;
  public columnDef: ColDef[] = [
    {
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: (params) => moment(params.value).format('L LTS'),
      minWidth: 160,
      maxWidth: 160,
    },
    {
      field: 'amount',
      minWidth: 120,
      maxWidth: 120,
    },
    {
      field: 'address'
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    }
  ]
  private data$: Observable<Payments |  undefined> = this.gql.etcMinerPayments()
    .pipe(
      map((response) => response.data.etcMinersPaymentsData),
      tap(data => {
        this.data = data;
      }),
      switchMap(() =>  this.gql.etcMinerPaymentsListen()),
      map((response) => response.data?.etcMinersPaymentsData),
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
