import {
  IPoolEtcMinersListenSubscription,
  IPoolEtcMinersGetQuery,
} from '@blockchain_client/graph-ql-client';
export type PoolEtcMinersLoaderType =
  | IPoolEtcMinersGetQuery['poolEtcMiners']
  | IPoolEtcMinersListenSubscription['poolEtcMiners'];
