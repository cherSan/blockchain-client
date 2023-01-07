import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Coin Data Per day' })
export class CmOneDayData {
  @Field(() => Assets)
  asset: Assets;
  @Field()
  time: number;
  @Field()
  BlkCnt: number;
  @Field()
  BlkSizeMeanByte: number;
  @Field()
  CapMrktCurUSD: number;
  @Field()
  DiffMean: number;
  @Field()
  FeeMeanUSD: number;
  @Field()
  HashRate: number;
  @Field()
  PriceUSD: number;
  @Field()
  RevUSD: number;
}
@ObjectType({ description: 'Coin Data Per day' })
export class CmOneDay {
  @Field(() => [CmOneDayData])
  ETH: CmOneDayData[];
  @Field(() => [CmOneDayData])
  ETC: CmOneDayData[];
  @Field(() => [CmOneDayData])
  BTC: CmOneDayData[];
  @Field(() => [CmOneDayData])
  BCH: CmOneDayData[];
  @Field(() => [CmOneDayData])
  BSV: CmOneDayData[];
  @Field(() => [CmOneDayData])
  DOGE: CmOneDayData[];
  @Field(() => [CmOneDayData])
  DASH: CmOneDayData[];
  @Field(() => [CmOneDayData])
  LTC: CmOneDayData[];
}
