import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { Assets } from "../constants/assets.constants";
import { CMAssetPriceHistory } from "../models/price-history.model";
import { CMAssetLastPrice } from "../models/last-price.model";

@Resolver(() => CMAssetPriceHistory)
export class CMAssetPriceHistoryResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CMAssetPriceHistory) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CMAssetPriceHistory) {
    return moment(data.time).valueOf()
  }
  @ResolveField(() => Number, {name: 'ReferenceRateUSD'})
  ReferenceRateUSD(@Parent() data: CMAssetLastPrice) {
    return parseFloat(`${data.ReferenceRateUSD}`)
  }
  @ResolveField(() => Number, {name: 'ReferenceRateEUR'})
  ReferenceRateEUR(@Parent() data: CMAssetLastPrice) {
    return parseFloat(`${data.ReferenceRateEUR}`)
  }
}
