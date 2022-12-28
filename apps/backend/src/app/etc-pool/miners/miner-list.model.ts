import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'miner information' })
export class Miner {
  @Field()
  id: string;
  @Field()
  blocks: number;
  @Field()
  hr: number;
  @Field()
  lastBeat: number;
  @Field()
  offline: boolean;
}

@ObjectType({ description: 'node miners list' })
export class MinersList {
  @Field()
  hashrate: number;
  @Field()
  minersTotal: number;
  @Field()
  now: number;
  @Field(() => [Miner])
  miners: Miner[];
}
