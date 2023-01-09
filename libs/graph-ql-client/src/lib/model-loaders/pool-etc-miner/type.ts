import {
  IPoolEtcMinerListenSubscription,
  IPoolEtcMinerGetQuery,
  IPoolEtcMinerGetQueryVariables,
  IPoolEtcMinerListenSubscriptionVariables
} from "@blockchain_client/graph-ql-client";
export type PoolEtcMinerLoaderType =
  | IPoolEtcMinerGetQuery['poolEtcMiner']
  | IPoolEtcMinerListenSubscription['poolEtcMiner'];

export type PoolEtcMinerLoaderVariablesType =
  | IPoolEtcMinerGetQueryVariables
  | IPoolEtcMinerListenSubscriptionVariables;
