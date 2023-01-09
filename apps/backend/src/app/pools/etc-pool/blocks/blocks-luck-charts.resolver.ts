import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCBlocksLuckCharts } from "./blocks.model";
@Resolver(() => PoolETCBlocksLuckCharts)
export class PoolETCBlocksLuckChartsResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: PoolETCBlocksLuckCharts): number {
    return data.x * 1000
  }
  @ResolveField(() => Number, {name: 'reward'})
  reward(@Parent() data: PoolETCBlocksLuckCharts): number {
    return parseFloat(`${data.reward}`) / 1000000000000000000;
  }
}
