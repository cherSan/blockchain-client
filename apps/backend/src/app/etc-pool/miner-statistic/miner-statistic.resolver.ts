import { Args, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { MinerStat, MinerStatWorker } from "./miner-statistic.model";
import { MinerStatisticService } from "./miner-statistic.service";

@Resolver(() => MinerStat)
export class MinerStatisticResolver {
  constructor(
    private readonly statsService: MinerStatisticService
  ) {
  }

  @Query(() => MinerStat, { name: 'etcMinerData' })
  async getMinerData(
    @Args('id') id: string
  ): Promise<MinerStat> {
    try {
      const recipe = await this.statsService.getMainerStat(id)
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => MinerStat)
  async etcMinerData(
    @Args('id') id: string
  ) {
    try {
      return this.statsService.subscribeMinerStat(id);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }

  @ResolveField(() => Number, {name: 'reward24h'})
  reward24h(@Parent() data: MinerStat & {'24hreward': number}) {
    return data['24hreward'];
  }

  @ResolveField(() => [MinerStatWorker], {name: 'workers'})
  workers(@Parent() data: MinerStat & {workers: Object}) {
    return Object.entries(data.workers).map(([id, data]) => ({
      ...data,
      id: `${id}`
    }));
  }
}
