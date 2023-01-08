import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerStatShareChart } from "./miner-statistic.model";

@Resolver(() => MinerStatShareChart)
export class MinerStatisticShareChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: MinerStatShareChart) {
    return data.x * 1000
  }
}
