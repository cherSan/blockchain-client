import {
  IPoolEtcStatsListenSubscription,
  IPoolEtcStatsGetQuery,
} from '@blockchain_client/graph-ql-client';
export type PoolEtcStatsLoaderType =
  | IPoolEtcStatsGetQuery['poolEtcStats']
  | IPoolEtcStatsListenSubscription['poolEtcStats'];
