import {
  INewsDataListenSubscription,
  INewsDataGetQuery,
} from '@blockchain_client/graph-ql-client';
export type NewsDataLoaderType =
  | INewsDataGetQuery['newsData']
  | INewsDataListenSubscription['newsData'];
