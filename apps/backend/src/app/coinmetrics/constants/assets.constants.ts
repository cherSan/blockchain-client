import { registerEnumType } from "@nestjs/graphql";
export enum Assets {
  ETH = "ETH",
  ETC = "ETC",
  BTC = "BTC",
  BCH = "BCH",
  BSV = "BSV",
  DOGE = "DOGE",
  DASH = "DASH",
  LTC = "LTC"
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
  FeeMeanUSD = "FeeMeanUSD",
  GasLmtTxMean = "GasLmtTxMean",
  CapMrktCurUSD = "CapMrktCurUSD",
  BlkWghtMean = "BlkWghtMean",
  BlkSizeMeanByte = "BlkSizeMeanByte",
  BlkCnt = "BlkCnt",
  RevUSD = "RevUSD",
  PriceUSD = "PriceUSD",
  HashRate = "HashRate",
  DiffMean = "DiffMean",
  PriceBTC = "PriceBTC",
  ReferenceRateUSD = "ReferenceRateUSD",
  ReferenceRateEUR = "ReferenceRateEUR"
}
export const MetricsHistoryList = [
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
export const MetricsPriceList = [
  Metrics.ReferenceRateUSD,
  Metrics.ReferenceRateEUR
];

registerEnumType(Assets, {
  name: 'Assets',
  description: 'The supported assets.',
});

registerEnumType(Metrics, {
  name: 'Metrics',
  description: 'The supported metrics.',
});
