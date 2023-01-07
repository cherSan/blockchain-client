import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Coin Data Per hour' })
export class CmOneHourData {
  @Field(() => Assets)
  asset: Assets;
  @Field()
  time: number;
  @Field()
  ReferenceRate: number;
}
@ObjectType({ description: 'Coin Data Per hour' })
export class CmOneHour {
  @Field(() => [CmOneHourData])
  ETH: CmOneHourData[];
  @Field(() => [CmOneHourData])
  ETC: CmOneHourData[];
  @Field(() => [CmOneHourData])
  BTC: CmOneHourData[];
  @Field(() => [CmOneHourData])
  BCH: CmOneHourData[];
  @Field(() => [CmOneHourData])
  BSV: CmOneHourData[];
  @Field(() => [CmOneHourData])
  DOGE: CmOneHourData[];
  @Field(() => [CmOneHourData])
  DASH: CmOneHourData[];
  @Field(() => [CmOneHourData])
  LTC: CmOneHourData[];
}
