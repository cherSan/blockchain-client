import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType({ description: 'Miner Information' })
export class PoolETCMinersMiner {
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
@ObjectType({ description: 'Miners List' })
export class PoolETCMiners {
  @Field()
  hashrate: number;
  @Field()
  minersTotal: number;
  @Field()
  now: number;
  @Field(() => [PoolETCMinersMiner])
  miners: PoolETCMinersMiner[];
}
