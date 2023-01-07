import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import * as moment from "moment";
import { CmOneHourData } from "../models/one-hour.model";
import { Assets } from "../constants/assets.constants";

@Resolver(() => CmOneHourData)
export class CmOneHourDataResolver {
  @ResolveField(() => Number, {name: 'asset'})
  asset(@Parent() data: CmOneHourData) {
    const toUpperCase = data.asset.toString().toUpperCase();
    return Assets[toUpperCase]
  }
  @ResolveField(() => Number, {name: 'time'})
  time(@Parent() data: CmOneHourData) {
    return moment(data.time).valueOf()
  }
  @ResolveField(() => Number, {name: 'ReferenceRate'})
  ReferenceRate(@Parent() data: CmOneHourData) {
    return parseFloat(`${data.ReferenceRate}`)
  }
}
