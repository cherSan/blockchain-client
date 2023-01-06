import {
  IEtcMinersQuery,
  IListenEtcMinersSubscription,
} from "@blockchain_client/graph-ql-client";

export type EtcMiners = IEtcMinersQuery['etcMinersList'] | IListenEtcMinersSubscription['etcMinersList'];
