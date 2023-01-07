import { Pipe, PipeTransform } from '@angular/core';
import { AssetsLoaderType } from "@blockchain_client/graph-ql-client";
@Pipe({
  name: 'currentAsset'
})
export class CurrentAssetPipe implements PipeTransform {
  transform(assets?: AssetsLoaderType, symbol?: string | null): AssetsLoaderType["data"][number] | undefined {
    if (!symbol || !assets) return undefined;
    return assets?.data?.find(v => v.symbol === symbol);
  }
}
