import { Component } from '@angular/core';
import { map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ColDef } from "ag-grid-community";
import * as moment from "moment";
@Component({
  selector: 'rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
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
      field: 'reward',
      type: 'CoinAmount',
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
  constructor(
    private activeRouter: ActivatedRoute,
  ) {

  }
}
