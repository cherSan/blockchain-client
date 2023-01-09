import {
  IPoolEtcBlocksListenSubscription,
  IPoolEtcBlocksGetQuery,
} from '@blockchain_client/graph-ql-client';
export type PoolEtcBlocksLoaderType =
  | IPoolEtcBlocksGetQuery['poolEtcBlocks']
  | IPoolEtcBlocksListenSubscription['poolEtcBlocks'];
