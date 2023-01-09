import {
  ICmAssetsPriceHistoryListenSubscription,
  ICmAssetsPriceHistoryGetQuery,
} from '@blockchain_client/graph-ql-client';
export type CmAssetsPriceHistoryLoaderType =
  | ICmAssetsPriceHistoryGetQuery['cmAssetsPriceHistory']
  | ICmAssetsPriceHistoryListenSubscription['cmAssetsPriceHistory'];
