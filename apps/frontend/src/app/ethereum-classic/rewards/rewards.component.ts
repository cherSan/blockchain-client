import { Component } from '@angular/core';
import { map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import * as moment from "moment";
import { LinkRenderComponent } from "../../shared/grid/link-render/link-render.component";
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
      field: 'blockhash',
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        component: LinkRenderComponent,
      }),
      onCellClicked: (param) => {
        window.open(`https://etcblockexplorer.com/block/${param.value}`, '_blank')
      }
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
      field: 'blockheight'
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
