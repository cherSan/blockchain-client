import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCStatsStat } from "./stats.model";
@Resolver(() => PoolETCStatsStat)
export class PoolETCStatsStatResolver {
  @ResolveField(() => Number, {name: 'lastBlockFound'})
  lastBlockFound(@Parent() data: PoolETCStatsStat): number {
    return parseFloat(`${data.lastBlockFound || 0}`) * 1000;
  }
}
