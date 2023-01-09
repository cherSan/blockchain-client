import {
  IPoolEtcPaymentsListenSubscription,
  IPoolEtcPaymentsGetQuery,
} from '@blockchain_client/graph-ql-client';
export type PoolEtcPaymentsLoaderType =
  | IPoolEtcPaymentsGetQuery['poolEtcPayments']
  | IPoolEtcPaymentsListenSubscription['poolEtcPayments'];
