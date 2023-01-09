import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { CMAssetLastPrice } from "../models/last-price.model";
import { Assets } from "../constants/assets.constants";
@Resolver(() => CMAssetLastPrice)
export class CMAssetLastPriceResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CMAssetLastPrice) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CMAssetLastPrice) {
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
