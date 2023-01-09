import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCStatsNode } from "./stats.model";
@Resolver(() => PoolETCStatsNode)
export class PoolETCStatsNodeResolver {
  @ResolveField(() => Number, {name: 'blocktime'})
  blocktime(@Parent() data: PoolETCStatsNode): number {
    return parseFloat(`${data.blocktime}`);
  }
  @ResolveField(() => Number, {name: 'difficulty'})
  difficulty(@Parent() data: PoolETCStatsNode): number {
    return parseFloat(`${data.difficulty || 0}`);
  }
  @ResolveField(() => Number, {name: 'height'})
  height(@Parent() data: PoolETCStatsNode): number {
    return parseFloat(`${data.height || 0}`);
  }
  @ResolveField(() => Number, {name: 'lastBeat'})
  lastBeat(@Parent() data: PoolETCStatsNode): number {
    return parseFloat(`${data.lastBeat || 0}`) * 1000;
  }
  @ResolveField(() => Number, {name: 'hashrate'})
  hashrate(@Parent() data: PoolETCStatsNode): number {
    return parseFloat(`${data.difficulty || 0}`) / parseFloat(`${data.blocktime || 1}`);
  }
}
