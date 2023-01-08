import { Field, ObjectType } from "@nestjs/graphql";
import { ExchangeData } from "../models/exchange-data.model";
@ObjectType({ description: 'node stats' })
export class PoolETCStatsStat {
  @Field()
  nShares: number;
  @Field()
  roundShares: number;
  @Field()
  lastBlockFound: number;
}
@ObjectType({ description: 'node stats' })
export class PoolETCStatsChart {
  @Field()
  x: number;
  @Field()
  y: number;
}
@ObjectType({ description: 'node stats' })
export class PoolETCStatsNode {
  @Field()
  blocktime: number
  @Field()
  difficulty: number;
  @Field()
  height: number;
  @Field()
  lastBeat: number;
  @Field()
  name: string;
  @Field()
  hashrate: number;
}
@ObjectType({ description: 'stats from remote server model' })
export class PoolETCStats {
  @Field()
  candidatesTotal: number;
  @Field()
  hashrate: number;
  @Field()
  immatureTotal: number;
  @Field()
  maturedTotal: number;
  @Field()
  minersTotal: number;
  @Field()
  now: number;
  @Field(() => [PoolETCStatsNode])
  nodes: PoolETCStatsNode[];
  @Field(() => [PoolETCStatsChart])
  poolCharts: PoolETCStatsChart[];
  @Field(() => [PoolETCStatsChart])
  netCharts: PoolETCStatsChart[];
  @Field(() => PoolETCStatsStat)
  stats: PoolETCStatsStat;
  @Field(() => ExchangeData)
  exchangedata: ExchangeData;
  @Field(() => PoolETCStatsNode)
  bestNode: PoolETCStatsNode
  @Field()
  poolLuck: number;
  @Field()
  nextEpoch: number;
  @Field()
  offsetEpoch: number;
  @Field()
  epoch: number;
  @Field()
  dagSize: number;
}
