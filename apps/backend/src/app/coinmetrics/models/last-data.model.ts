import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Coin Data Per hour' })
export class CmLastData {
  @Field(() => Assets)
  asset: Assets;
  @Field()
  time: number;
  @Field()
  DiffMean: number;
  HashRate: number;
  @Field()
  PriceUSD: number;
}
@ObjectType({ description: 'Coin Data Per hour' })
export class CmLast {
  @Field(() => CmLastData)
  ETH: CmLastData;
  @Field(() => CmLastData)
  ETC: CmLastData;
  @Field(() => CmLastData)
  BTC: CmLastData;
  @Field(() => CmLastData)
  BCH: CmLastData;
  @Field(() => CmLastData)
  BSV: CmLastData;
  @Field(() => CmLastData)
  DOGE: CmLastData;
  @Field(() => CmLastData)
  DASH: CmLastData;
  @Field(() => CmLastData)
  LTC: CmLastData;
}
