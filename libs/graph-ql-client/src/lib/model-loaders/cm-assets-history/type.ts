import {
  ICmAssetsHistoryListenSubscription,
  ICmAssetsHistoryGetQuery,
} from '@blockchain_client/graph-ql-client';
export type CmAssetsHistoryLoaderType =
  | ICmAssetsHistoryGetQuery['cmAssetsHistory']
  | ICmAssetsHistoryListenSubscription['cmAssetsHistory'];
