import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { CmOneDayData } from "../models/one-day.model";
import { Assets } from "../constants/assets.constants";

@Resolver(() => CmOneDayData)
export class CmOneDayDataResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CmOneDayData) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CmOneDayData) {
    return moment(data.time).valueOf()
  }
  @ResolveField(() => Number, {name: 'BlkCnt'})
  BlkCnt(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.BlkCnt}`)
  }
  @ResolveField(() => Number, {name: 'BlkSizeMeanByte'})
  BlkSizeMeanByte(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.BlkSizeMeanByte}`)
  }
  @ResolveField(() => Number, {name: 'CapMrktCurUSD'})
  CapMrktCurUSD(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.CapMrktCurUSD}`)
  }
  @ResolveField(() => Number, {name: 'DiffMean'})
  DiffMean(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.DiffMean}`)
  }
  @ResolveField(() => Number, {name: 'FeeMeanUSD'})
  FeeMeanUSD(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.FeeMeanUSD}`)
  }
  @ResolveField(() => Number, {name: 'HashRate'})
  HashRate(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.HashRate}`)
  }
  @ResolveField(() => Number, {name: 'PriceUSD'})
  PriceUSD(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.PriceUSD}`)
  }
  @ResolveField(() => Number, {name: 'RevUSD'})
  RevUSD(@Parent() data: CmOneDayData) {
    return parseFloat(`${data.RevUSD}`)
  }
}
