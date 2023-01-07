import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { CmLastData } from "../models/last-data.model";
import { Assets } from "../constants/assets.constants";

@Resolver(() => CmLastData)
export class CmLastDataResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CmLastData) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CmLastData) {
    return moment(data.time).valueOf()
  }
  @ResolveField(() => Number, {name: 'DiffMean'})
  DiffMean(@Parent() data: CmLastData) {
    return parseFloat(`${data.DiffMean}`)
  }
  @ResolveField(() => Number, {name: 'HashRate'})
  HashRate(@Parent() data: CmLastData) {
    return parseFloat(`${data.HashRate}`)
  }
  @ResolveField(() => Number, {name: 'PriceUSD'})
  PriceUSD(@Parent() data: CmLastData) {
    return parseFloat(`${data.PriceUSD}`)
  }
}
