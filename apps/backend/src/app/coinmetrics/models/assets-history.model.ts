import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";
@ObjectType({ description: 'Asset History' })
export class CMAssetHistory {
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
@ObjectType({ description: 'Assets Histories' })
export class CMAssetsHistory {
  @Field(() => [CMAssetHistory])
  ETH: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  ETC: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  BTC: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  BCH: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  BSV: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  DOGE: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  DASH: CMAssetHistory[];
  @Field(() => [CMAssetHistory])
  LTC: CMAssetHistory[];
}
