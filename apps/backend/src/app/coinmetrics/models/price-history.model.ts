import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Asset Price History' })
export class CMAssetPriceHistory {
  @Field(() => Assets)
  asset: Assets;
  @Field()
  time: number;
  @Field()
  ReferenceRateUSD: number;
  @Field()
  ReferenceRateEUR: number;
}
@ObjectType({ description: 'Assets Price Histories' })
export class CMAssetsPriceHistory {
  @Field(() => [CMAssetPriceHistory])
  ETH: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  ETC: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  BTC: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  BCH: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  BSV: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  DOGE: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  DASH: CMAssetPriceHistory[];
  @Field(() => [CMAssetPriceHistory])
  LTC: CMAssetPriceHistory[];
}
