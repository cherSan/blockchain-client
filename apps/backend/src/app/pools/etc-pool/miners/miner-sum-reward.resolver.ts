import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCMinerSumReward } from "./miner.model";
@Resolver(() => PoolETCMinerSumReward)
export class PoolETCMinerSumRewardResolver {
  @ResolveField(() => Number, {name: 'reward'})
  reward(@Parent() data: PoolETCMinerSumReward) {
    return (data.reward * 0.000000001);
  }
}

