import {
  ICoinHistoryQuery, IListenCoinHistorySubscription,
} from "@blockchain_client/graph-ql-client";

export type CoinHistory = ICoinHistoryQuery["coinHistory"] | IListenCoinHistorySubscription["coinHistory"];
