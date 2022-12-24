import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'node assets' })
export class Asset {
  @Field()
  id: string;
  @Field()
  rank: string;
  @Field()
  symbol: string;
  @Field()
  name: string;
  @Field()
  supply: string;
  @Field({ nullable: true })
  maxSupply: string;
  @Field()
  marketCapUsd: string;
  @Field()
  volumeUsd24Hr: string;
  @Field()
  priceUsd: string;
  @Field()
  changePercent24Hr: string;
  @Field({nullable: true})
  vwap24Hr: string;
}

@ObjectType({ description: 'node assets' })
export class AssetsInfo {
  @Field(() => [Asset])
  data: Asset[];
  @Field()
  timestamp: number;
}
