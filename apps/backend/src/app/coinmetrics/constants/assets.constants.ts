import { registerEnumType } from "@nestjs/graphql";
import { CurrencyType } from "../../coincap/rates/rate.model";

export enum Assets {
  ETH,
  ETC,
  BTC,
  BCH,
  BSV,
  DOGE,
  DASH,
  LTC
}
export const AssetList = [
  Assets.BTC,
  Assets.ETC,
  Assets.ETH,
  Assets.DOGE,
  Assets.DASH,
  Assets.BSV,
  Assets.BCH,
  Assets.LTC
];
export enum Metrics {
  FeeMeanUSD,
  GasLmtTxMean,
  CapMrktCurUSD,
  BlkWghtMean,
  BlkSizeMeanByte,
  BlkCnt,
  RevUSD,
  PriceUSD,
  HashRate,
  DiffMean,
  PriceBTC
}
export const MetricsList = [
  Metrics.FeeMeanUSD,
  Metrics.GasLmtTxMean,
  Metrics.CapMrktCurUSD,
  Metrics.BlkWghtMean,
  Metrics.BlkSizeMeanByte,
  Metrics.BlkCnt,
  Metrics.RevUSD,
  Metrics.PriceUSD,
  Metrics.HashRate,
  Metrics.DiffMean,
  Metrics.PriceBTC
];

registerEnumType(Assets, {
  name: 'Assets',
  description: 'The supported assets.',
});

registerEnumType(Metrics, {
  name: 'Metrics',
  description: 'The supported metrics.',
});
