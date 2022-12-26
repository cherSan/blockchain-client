import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ApolloAngularSDK, IAssetsQuery, IListenAssetsSubscription } from "@blockchain_client/graph-ql-client";
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";

type Assets = IAssetsQuery["assets"] | IListenAssetsSubscription["assets"];
type Asset = Assets["data"][number];
type Pairs = {
  symbol: string,
  forward: number,
  backward: number
}
@Component({
  selector: 'coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  public symbol = '';
  public data: undefined | Assets;
  public price = 0;
  public changePercent24Hr = 0;
  public title = '';
  public marketCapUsd = 0;
  public volumeUsd24Hr = 0;
  public supply = '';
  public vwap24Hr = '';
  public rank: number | string = 0;
  public pairs: Pairs[] = [];
  public update: number = 0;
  public columns: ColDef[] = []

  private data$: Observable<undefined | Assets | boolean> = this.activeRoute.params.pipe(
    tap(params => this.symbol = params['id']),
    switchMap(params => {
      const coinSymbol = params['id'];
      this.updateColumns(coinSymbol);
      return this.gql.assets().pipe(
        map(response => response.data?.assets),
        map((data) => this.parseData(data, coinSymbol)),
        switchMap((currentCoin) => {
          return currentCoin ? this.gql.listenAssets().pipe(
              map(response => response.data?.assets),
              tap((data) => {
                this.parseData(data, coinSymbol)
              }),
            ) :
            this.router.navigate(['.'], { relativeTo: this.activeRoute.parent })
        })
      );
    })
  )

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )
  constructor(
    private gql: ApolloAngularSDK,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }
  private setData(currentCoin: Asset | null | undefined): void {
    this.price = parseFloat(currentCoin?.priceUsd || '0');
    this.changePercent24Hr = parseFloat(currentCoin?.changePercent24Hr || '0');
    this.title = currentCoin?.name || 'No Title';
    this.marketCapUsd = parseFloat(currentCoin?.marketCapUsd || '0');
    this.volumeUsd24Hr = parseFloat(currentCoin?.volumeUsd24Hr || '0');
    this.supply = currentCoin?.supply || '';
    this.vwap24Hr = currentCoin?.vwap24Hr || '';
    this.rank = currentCoin?.rank || '-';
  }

  private parseData(data: Assets | undefined, symbol: string) {
    const currentCoin = data?.data.find(v => v.symbol === symbol);
    this.data = data
    this.update = data?.timestamp || 0;
    this.setData(currentCoin);
    this.makePairs(currentCoin, data);
    return currentCoin;
  }

  private makePairs(currentCoin: undefined | Asset, coins: Assets | undefined) {
    if (currentCoin && coins) {
      this.pairs = coins.data.map(v => ({
        id: v.symbol,
        symbol: v.symbol,
        name: v.name,
        forward: parseFloat(currentCoin.priceUsd) / parseFloat(v.priceUsd),
        backward: parseFloat(v.priceUsd) / parseFloat(currentCoin.priceUsd)
      })).filter(v => v.symbol !== this.symbol)
    }
  }

  updateColumns(symbol:string) {
    this.columns = [
      { field: 'id', hide: true },
      {
        field: 'symbol',
        filter: true,
        floatingFilter: true,
        headerName: '',
        width: 170,
        minWidth: 170,
        cellRendererSelector:  (_: ICellRendererParams) =>  ({
          params: {
            value: ['symbol', 'name']
          },
          component: CoinRenderComponent,
        })
      },
      {
        field: 'forward',
        type: 'ChangeDetection',
        headerName: symbol + ' / Coin*',
        valueFormatter: (params) => params.value.toFixed(8),
      },
      {
        field: 'backward',
        type: 'ChangeDetection',
        headerName: 'Coin* / ' + symbol,
        valueFormatter: (params) => params.value.toFixed(8),
      }
    ];
  }

  onRowClick($event: RowClickedEvent<Assets["data"][number]>) {
    return this.router.navigate([$event.data?.symbol], {relativeTo: this.activeRoute.parent})
  }
}
