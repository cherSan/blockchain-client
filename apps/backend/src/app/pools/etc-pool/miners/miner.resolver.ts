import { Args, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { PoolETCMiner, PoolETCMinerWorker } from "./miner.model";
import { PoolETCMinerService } from "./miner.service";
@Resolver(() => PoolETCMiner)
export class PoolETCMinerResolver {
  constructor(
    private readonly statsService: PoolETCMinerService
  ) {
  }
  @Query(() => PoolETCMiner, { name: 'poolEtcMiner' })
  async poolEtcMinerGet(
    @Args('id') id: string
  ): Promise<PoolETCMiner> {
    try {
      return await this.statsService.getMiner(id)
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  @Subscription(() => PoolETCMiner, {name: 'poolEtcMiner'})
  async poolEtcMinerSubscribe(
    @Args('id') id: string
  ) {
    try {
      return this.statsService.subscribeMiner(id);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  @ResolveField(() => Number, {name: 'reward24h'})
  reward24h(@Parent() data: PoolETCMiner & {'24hreward': number}): number {
    return (data['24hreward'] * 0.000000001);
  }
  @ResolveField(() => [PoolETCMinerWorker], {name: 'workers'})
  workers(@Parent() data: PoolETCMiner & {workers: Object}): PoolETCMinerWorker[] {
    return Object.entries(data.workers).map(([id, data]) => ({
      ...data,
      id: `${id}`
    }));
  }
}
