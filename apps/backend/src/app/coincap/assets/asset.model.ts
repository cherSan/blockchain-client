import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'node assets' })
export class Asset {
  @Field()
  id: string;
  @Field()
  rank: number;
  @Field()
  symbol: string;
  @Field()
  name: string;
  @Field()
  supply: number;
  @Field({ nullable: true })
  maxSupply: number;
  @Field()
  marketCapUsd: number;
  @Field()
  volumeUsd24Hr: number;
  @Field()
  priceUsd: number;
  @Field()
  changePercent24Hr: number;
  @Field({nullable: true})
  vwap24Hr: number;
}

@ObjectType({ description: 'node assets' })
export class AssetsInfo {
  @Field(() => [Asset])
  data: Asset[];
  @Field()
  timestamp: number;
}
