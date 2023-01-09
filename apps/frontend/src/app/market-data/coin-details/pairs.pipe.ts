import { Pipe, PipeTransform } from '@angular/core';
import { AssetsLoaderType } from "@blockchain_client/graph-ql-client";
type Pairs = {
  symbol: string,
  forward: number,
  backward: number
}
@Pipe({
  name: 'pairs'
})
export class PairsPipe implements PipeTransform {
  transform(assets?: AssetsLoaderType | null, symbol?: string | null): Pairs[] {
    if (!assets || !symbol) {
      return [];
    }
    const currentAsset = assets?.data?.find(v => v.symbol === symbol)
    if (currentAsset && assets) {
      return assets.data.map(v => ({
        id: v.symbol,
        symbol: v.symbol,
        name: v.name,
        forward: currentAsset.priceUsd / v.priceUsd,
        backward: v.priceUsd / currentAsset.priceUsd
      })).filter(v => v.symbol !== symbol)
    }
    return [];
  }

}
