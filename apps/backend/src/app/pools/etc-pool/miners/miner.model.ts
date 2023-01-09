import { Field, ObjectType } from "@nestjs/graphql";
import { ExchangeData } from "../models/exchange-data.model";
@ObjectType()
export class PoolETCMinerChart {
  @Field()
  x: number;
  @Field({ nullable: true })
  minerHash: number;R
  @Field({ nullable: true })
  minerLargeHash: number;
  @Field({ nullable: true })
  workerOnline: number;
}
@ObjectType()
export class PoolETCMinerShareChart {
  @Field()
  x: number;
  @Field()
  valid: number;
  @Field()
  stale: number;
  @Field({ nullable: true })
  workerOnline: number;
}
@ObjectType()
export class PoolETCMinerStats {
  @Field()
  balance: number;
  @Field()
  blocksFound: number;
  @Field()
  immature: number;
  @Field()
  lastShare: number;
  @Field()
  lastShareDiff: number;
  @Field()
  paid: number;
  @Field()
  pending: number;
  @Field()
  roundShares: number;
}
@ObjectType()
export class PoolETCMinerSumReward {
  @Field()
  inverval: number;
  @Field()
  reward: number;
  @Field()
  name: string;
  @Field()
  offset: number;
  @Field()
  blocks: number;
}
@ObjectType()
export class PoolETCMinerPayments {
  @Field()
  amount: number;
  @Field()
  timestamp: number;
  @Field()
  tx: string;
}
@ObjectType()
export class PoolETCMinerPaymentChart {
  @Field()
  amount: number;
  @Field()
  x: number;
}
@ObjectType()
export class PoolETCMinerWorker {
  @Field()
  id: string;
  @Field()
  lastBeat: number;
  @Field()
  hr: number;
  @Field()
  offline: boolean;
  @Field()
  blocks: number;
  @Field()
  hr2: number;
  @Field()
  valid: number;
  @Field()
  stale: number;
  @Field()
  invalid: number;
  @Field()
  v_per: number;
  @Field()
  s_per: number;
  @Field()
  i_per: number;
  @Field()
  w_stat: number;
  @Field()
  w_stat_s: number;
}
@ObjectType()
export class PoolETCMinerReward {
  @Field()
  blockhash: string;
  @Field()
  blockheight: number;
  @Field()
  immature: boolean;
  @Field()
  percent: number;
  @Field()
  reward: number;
  @Field()
  timestamp: number;
}
@ObjectType()
export class PoolETCMiner {
  @Field()
  id: string;
  @Field(() => Number)
  reward24h: number;
  @Field()
  currentHashrate: number;
  @Field(() => ExchangeData)
  exchangedata: ExchangeData;
  @Field()
  hashrate: number;
  @Field(() => [PoolETCMinerChart])
  minerCharts: PoolETCMinerChart[];
  @Field()
  paymentsTotal: number;
  @Field()
  roundShares: number;
  @Field(() => [PoolETCMinerShareChart])
  shareCharts: PoolETCMinerShareChart[];
  @Field(() => PoolETCMinerStats)
  stats: PoolETCMinerStats;
  @Field(() => [PoolETCMinerSumReward])
  sumrewards: PoolETCMinerSumReward[];
  @Field(() => [PoolETCMinerWorker])
  workers: PoolETCMinerWorker[];
  @Field()
  workersOffline: number;
  @Field()
  workersOnline: number;
  @Field()
  workersTotal: number;
  @Field(() => [PoolETCMinerPayments], { nullable: true })
  payments?: PoolETCMinerPayments[];
  @Field(() => [PoolETCMinerPaymentChart], { nullable: true })
  paymentCharts?: PoolETCMinerPaymentChart[]
  @Field(() => [PoolETCMinerReward], { nullable: true })
  rewards?: PoolETCMinerReward[]
}
