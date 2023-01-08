import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerStatMinerChart } from "./miner-statistic.model";

@Resolver(() => MinerStatMinerChart)
export class MinerStatisticMinerChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: MinerStatMinerChart) {
    return data.x * 1000
  }
}
