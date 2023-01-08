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
    return parseFloat(`${data.BlkCnt}`)
  }
  @ResolveField(() => Number, {name: 'BlkSizeMeanByte'})
  BlkSizeMeanByte(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.BlkSizeMeanByte}`)
  }
  @ResolveField(() => Number, {name: 'CapMrktCurUSD'})
  CapMrktCurUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.CapMrktCurUSD}`)
  }
  @ResolveField(() => Number, {name: 'DiffMean'})
  DiffMean(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.DiffMean}`)
  }
  @ResolveField(() => Number, {name: 'FeeMeanUSD'})
  FeeMeanUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.FeeMeanUSD}`)
  }
  @ResolveField(() => Number, {name: 'HashRate'})
  HashRate(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.HashRate}`)
  }
  @ResolveField(() => Number, {name: 'PriceUSD'})
  PriceUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.PriceUSD}`)
  }
  @ResolveField(() => Number, {name: 'RevUSD'})
  RevUSD(@Parent() data: CMAssetHistory) {
    return parseFloat(`${data.RevUSD}`)
  }
}
