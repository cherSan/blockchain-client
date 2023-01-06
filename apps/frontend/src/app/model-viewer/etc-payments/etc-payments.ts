import {
  IEtcMinerPaymentsListenSubscription,
  IEtcMinerPaymentsQuery,
} from "@blockchain_client/graph-ql-client";

export type EtcPayments = IEtcMinerPaymentsQuery["etcMinersPaymentsData"] | IEtcMinerPaymentsListenSubscription["etcMinersPaymentsData"];
