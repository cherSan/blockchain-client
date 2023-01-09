import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Asset Last Price' })
export class CMAssetLastPrice {
  @Field(() => Assets)
  asset: Assets;
  @Field()
  time: number;
  @Field()
  ReferenceRateUSD: number;
  @Field()
  ReferenceRateEUR: number;
}
@ObjectType({ description: 'Assets Last Prices' })
export class CMAssetsLastPrice {
  @Field(() => CMAssetLastPrice)
  ETH: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  ETC: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  BTC: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  BCH: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  BSV: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  DOGE: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  DASH: CMAssetLastPrice;
  @Field(() => CMAssetLastPrice)
  LTC: CMAssetLastPrice;
}
