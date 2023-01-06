import {
  IListenMinerstatsCoinsQuery,
  IMinerstatsCoinsQuery,
} from "@blockchain_client/graph-ql-client";

export type Coins = IMinerstatsCoinsQuery["coins"] | IListenMinerstatsCoinsQuery["coins"];
export type Coin = Coins[number];
