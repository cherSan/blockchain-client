import { Field, ObjectType } from "@nestjs/graphql";
import { ExchangeData } from "../models/exchange-data.model";

@ObjectType({ description: 'node stats' })
export class Stat {
  @Field()
  nShares: number;
  @Field()
  roundShares: number;
}

@ObjectType({ description: 'node stats' })
export class Chart {
  @Field()
  x: number;
  @Field()
  y: number;
  @Field()
  timeFormat: string;
}

@ObjectType({ description: 'node stats' })
export class Node {
  @Field()
  blocktime: string
  @Field()
  difficulty: string;
  @Field()
  height: string;
  @Field()
  lastBeat: string;
  @Field()
  name: string;
}
@ObjectType({ description: 'stats from remote server model' })
export class Stats {
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
  @Field(() => [Node])
  nodes: Node[];
  @Field(() => [Chart])
  poolCharts: Chart[];
  @Field(() => [Chart])
  netCharts: Chart[];
  @Field(() => Stat)
  stats: Stat;
  @Field(() => ExchangeData)
  exchangedata: ExchangeData
}
