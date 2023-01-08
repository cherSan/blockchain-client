import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { CMAssetHistory } from "../models/assets-history.model";
import { Assets } from "../constants/assets.constants";
@Resolver(() => CMAssetHistory)
export class CMAssetHistoryResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CMAssetHistory) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CMAssetHistory) {
    return moment(data.time).valueOf()
  }
  @ResolveField(() => Number, {name: 'BlkCnt'})
  BlkCnt(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.BlkCnt || 0}`)
  }
  @ResolveField(() => Number, {name: 'BlkSizeMeanByte'})
  BlkSizeMeanByte(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.BlkSizeMeanByte || 0}`)
  }
  @ResolveField(() => Number, {name: 'CapMrktCurUSD'})
  CapMrktCurUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.CapMrktCurUSD || 0}`)
  }
  @ResolveField(() => Number, {name: 'DiffMean'})
  DiffMean(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.DiffMean || 0}`)
  }
  @ResolveField(() => Number, {name: 'FeeMeanUSD'})
  FeeMeanUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.FeeMeanUSD || 0}`)
  }
  @ResolveField(() => Number, {name: 'HashRate'})
  HashRate(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.HashRate || 0}`)
  }
  @ResolveField(() => Number, {name: 'PriceUSD'})
  PriceUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.PriceUSD || 0}`)
  }
  @ResolveField(() => Number, {name: 'PriceBTC'})
  PriceBTC(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.PriceBTC || 0}`)
  }
  @ResolveField(() => Number, {name: 'RevUSD'})
  RevUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.RevUSD || 0}`)
  }
  @ResolveField(() => Number, {name: 'BlkWghtMean'})
  BlkWghtMean(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.BlkWghtMean || 0}`)
  }
  @ResolveField(() => Number, {name: 'GasLmtTxMean'})
  GasLmtTxMean(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.GasLmtTxMean || 0}`)
  }
}
