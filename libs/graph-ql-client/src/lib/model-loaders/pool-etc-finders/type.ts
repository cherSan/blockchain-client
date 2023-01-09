import {
  IPoolEtcFindersListenSubscription,
  IPoolEtcFindersGetQuery,
} from '@blockchain_client/graph-ql-client';
export type PoolEtcFindersLoaderType =
  | IPoolEtcFindersGetQuery['poolEtcFinders']
  | IPoolEtcFindersListenSubscription['poolEtcFinders'];
