import {
  ICmAssetsLastPriceListenSubscription,
  ICmAssetsLastPriceGetQuery,
} from '@blockchain_client/graph-ql-client';
export type CmAssetsLastPriceLoaderType =
  | ICmAssetsLastPriceGetQuery['cmAssetsLastPrice']
  | ICmAssetsLastPriceListenSubscription['cmAssetsLastPrice'];
