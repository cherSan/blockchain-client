import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCStatsChart } from "./stats.model";
@Resolver(() => PoolETCStatsChart)
export class PoolETCStatsChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: PoolETCStatsChart): number {
    return data.x * 1000;
  }
}
