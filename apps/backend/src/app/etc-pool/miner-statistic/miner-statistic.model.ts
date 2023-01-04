import { Field, ObjectType } from "@nestjs/graphql";
import { ExchangeData } from "../models/exchange-data.model";
@ObjectType()
export class MinerStatMinerChart {
  @Field()
  x: number;
  @Field({ nullable: true })
  minerHash: number;
  @Field({ nullable: true })
  minerLargeHash: number;
  @Field({ nullable: true })
  workerOnline: number;
}
@ObjectType()
export class MinerStatShareChart {
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
class MinerStatMinerStats {
  @Field()
  lastShare: number;
  @Field()
  lastShareDiff: number;
  @Field()
  roundShares: number;
}
@ObjectType()
class MinerStatSumReward {
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
export class MinerStatPayments {
  @Field()
  amount: number;
  @Field()
  timestamp: number;
  @Field()
  tx: string;
}
@ObjectType()
export class MinerStatPaymentChart {
  @Field()
  amount: number;
  @Field()
  x: number;
}
@ObjectType()
export class MinerStatWorker {
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
export class MinerStatReward {
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
export class MinerStat {
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
  @Field(() => [MinerStatMinerChart])
  minerCharts: MinerStatMinerChart[];
  @Field()
  paymentsTotal: number;
  @Field()
  roundShares: number;
  @Field(() => [MinerStatShareChart])
  shareCharts: MinerStatShareChart[];
  @Field(() => MinerStatMinerStats)
  stats: MinerStatMinerStats;
  @Field(() => [MinerStatSumReward])
  sumrewards: MinerStatSumReward[];
  @Field(() => [MinerStatWorker])
  workers: MinerStatWorker[];
  @Field()
  workersOffline: number;
  @Field()
  workersOnline: number;
  @Field()
  workersTotal: number;
  @Field(() => [MinerStatPayments], { nullable: true })
  payments?: MinerStatPayments[];
  @Field(() => [MinerStatPaymentChart], { nullable: true })
  paymentCharts?: MinerStatPaymentChart[]
  @Field(() => [MinerStatReward], { nullable: true })
  rewards?: MinerStatReward[]
}
