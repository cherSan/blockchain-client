import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { ColDef, GetRowIdParams, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { siSymbol } from "../../../utils/si-symbol";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {

  @HostListener('window:resize', ['$event'])
  resize = () => {}

  @Input()
  title?: string | null = undefined;

  @Input()
  extra?: string | null = undefined;

  @Input()
  rowData?: any[] | null;

  @Input()
  public columnDefs?: ColDef[]

  @Input()
  public defaultColDef: ColDef = {
    sortable: false,
    filter: false,
    editable: false,
    suppressMenu: true,
    autoHeight: true
  };

  @Output()
  rowClick = new EventEmitter()

  public columnTypes: {
    [key: string]: ColDef;
  } = {
    ChangeDetection: {
      editable: false,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: { textAlign: 'right' },
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => siSymbol(params.value),
    },
    Price: {
      editable: false,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: { textAlign: 'right' },
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => parseInt(`${params?.value}`).toFixed(2),
    },
    CoinAmount: {
      editable: false,
      aggFunc: 'sum',
      valueParser: 'Number',
      cellStyle: { textAlign: 'right' },
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => parseFloat(`${params?.value}`).toFixed(8),
    }
  };

  getRowId(params: GetRowIdParams) {
    return params.data.id
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.resize = params.api.sizeColumnsToFit.bind(params.api);
  }

  onRowClicked($event: RowClickedEvent<typeof this.rowData>) {
    this.rowClick.emit($event)
  }
}
