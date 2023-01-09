import { Pipe, PipeTransform } from '@angular/core';
import { IAssetsGetQuery, IAssetsListenSubscription } from "@blockchain_client/graph-ql-client";

type AssetsType = IAssetsGetQuery["assets"] | IAssetsListenSubscription["assets"];
@Pipe({
  name: 'getRates'
})
export class GetRatesPipe implements PipeTransform {
  transform(value: AssetsType | null | undefined = undefined, [symbol1, symbol2]: [string, string]): string {
    if (value === undefined || value === null) {
      return ''
    }
    if (symbol1 === 'USD') {
      const symbol2Value = value.data.find(v => v.symbol === symbol2);
      if (!symbol2Value) return 'N/A'
      return (1 / symbol2Value.priceUsd).toFixed(4);
    }
    if(symbol2 === 'USD') {
      const symbol1Value = value.data.find(v => v.symbol === symbol1);
      if (!symbol1Value) return 'N/A'
      return  symbol1Value.priceUsd.toFixed(4)
    }
    const symbol1Value = value.data.find(v => v.symbol === symbol1);
    const symbol2Value = value.data.find(v => v.symbol === symbol2);
    if (!symbol1Value || !symbol2Value) return 'N/A'
    return (symbol1Value.priceUsd / symbol2Value.priceUsd).toFixed(4);
  }

}
