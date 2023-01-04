import { Field, ObjectType } from "@nestjs/graphql";
import { ExchangeData } from "../models/exchange-data.model";
@ObjectType()
class MinerChart {
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
class ShareChart {
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
class MinerStats {
  @Field()
  lastShare: number;
  @Field()
  lastShareDiff: number;
  @Field()
  roundShares: number;
}
@ObjectType()
class SumReward {
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
export class Worker {
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
  @Field(() => [MinerChart])
  minerCharts: MinerChart[];
  @Field()
  paymentsTotal: number;
  @Field()
  roundShares: number;
  @Field(() => [ShareChart])
  shareCharts: ShareChart[];
  @Field(() => MinerStats)
  stats: MinerStats;
  @Field(() => [SumReward])
  sumrewards: SumReward[];
  @Field(() => [Worker])
  workers: Worker[];
  @Field()
  workersOffline: number;
  @Field()
  workersOnline: number;
  @Field()
  workersTotal: number;
}
