import { Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { PoolETCStats, PoolETCStatsNode } from "./stats.model";
import { PoolETCStatsService } from "./stats.service";
import { GraphQLError } from "graphql/error";

@Resolver(() => PoolETCStats)
export class PoolETCStatsResolver {
  constructor(
    private readonly statsService: PoolETCStatsService
  ) {}
  @Query(() => PoolETCStats, { name: 'poolEtcStats' })
  async poolEtcStatsGet(): Promise<PoolETCStats> {
    try {
      const recipe = await this.statsService.get()
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  @Subscription(() => PoolETCStats, { name: 'poolEtcStats' })
  async poolEtcStatsSubscribe() {
    try {
      return this.statsService.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  @ResolveField(() => PoolETCStatsNode, {name: 'bestNode'})
  bestNode(@Parent() data: PoolETCStats): PoolETCStatsNode {
    return data.nodes.reduce<PoolETCStatsNode>((acc, node) => {
      if (!acc) return node;
      acc = parseFloat(`${acc.height}`) < parseFloat(`${node.height}`)
        ? node : acc;
      return acc;
    }, undefined)
  }
  @ResolveField(() => Number, {name: 'poolLuck'})
  poolLuck(@Parent() data: PoolETCStats): number {
    const bestNode = this.bestNode(data);
    return parseFloat(`${data.stats.roundShares || 0}`) / parseFloat(`${bestNode.difficulty || 1}`);
  }
  @ResolveField(() => Number, {name: 'offsetEpoch'})
  offsetEpoch(@Parent() data: PoolETCStats): number {
    const bestNode = this.bestNode(data);
    return (60000 - (parseFloat(`${bestNode.height || 1}`) % 60000)) * 1000 * parseFloat(`${bestNode.blocktime || 1}`);
  }
  @ResolveField(() => Number, {name: 'nextEpoch'})
  nextEpoch(@Parent() data: PoolETCStats): number {
    const epochOffset = this.offsetEpoch(data)
    return Date.now() + epochOffset;
  }
  @ResolveField(() => Number, {name: 'epoch'})
  epoch(@Parent() data: PoolETCStats): number {
    const bestNode = this.bestNode(data);
    return parseFloat(`${bestNode.height || 0}`) / 60000;
  }
  @ResolveField(() => Number, {name: 'dagSize'})
  dagSize(@Parent() data: PoolETCStats): number {
    const epoch = this.epoch(data);
    return (epoch * 8192) / 1024 / 1024 + 1;
  }
}
