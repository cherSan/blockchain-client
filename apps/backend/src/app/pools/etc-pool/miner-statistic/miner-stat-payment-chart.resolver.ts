import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerStatPaymentChart } from "./miner-statistic.model";

@Resolver(() => MinerStatPaymentChart)
export class MinerStatisticsPaymentChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: MinerStatPaymentChart) {
    return data.x * 1000
  }
}
