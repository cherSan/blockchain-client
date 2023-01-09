import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PoolETCBlocksLuck {
  @Field()
  block: number;
  @Field()
  luck: number;
  @Field()
  orphanRate: number;
  @Field()
  uncleRate: number;
}
@ObjectType()
export class PoolETCBlocksLuckCharts {
  @Field()
  x: number;
  @Field()
  difficulty: number;
  @Field()
  height: number;
  @Field()
  reward: number;
  @Field()
  shares: number;
  @Field()
  sharesDiff: number;
}
@ObjectType()
export class PoolETCBlocksInfo {
  @Field()
  difficulty: number;
  @Field()
  hash: string;
  @Field()
  height: number;
  @Field()
  login: string;
  @Field()
  orphan: boolean;
  @Field()
  reward: number;
  @Field()
  shareDiff: number;
  @Field()
  shares: number;
  @Field()
  timestamp: number;
  @Field()
  uncle: boolean;
  @Field()
  uncleHeight: number;
  @Field()
  worker: string;
}

@ObjectType()
export class PoolETCBlocks {
  @Field(() => [PoolETCBlocksLuck], {nullable: true})
  luck?: PoolETCBlocksLuck[];
  @Field(() => [PoolETCBlocksLuckCharts], {nullable: true})
  luckCharts?: PoolETCBlocksLuckCharts[];
  @Field(() => [PoolETCBlocksInfo], {nullable: true})
  matured?: PoolETCBlocksInfo[];
  @Field(() => [PoolETCBlocksInfo], {nullable: true})
  immature?: PoolETCBlocksInfo[];
  @Field()
  maturedTotal: number;
  @Field()
  immatureTotal: number;
}
