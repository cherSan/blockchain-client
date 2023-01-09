import { PoolETCBlocksInfo } from "./blocks.model";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
@Resolver(() => PoolETCBlocksInfo)
export class PoolETCBlocksInfoResolver {
  @ResolveField(() => Number, {name: 'reward'})
  reward(@Parent() data: PoolETCBlocksInfo): number {
    return parseFloat(`${data.reward}`) / 1000000000000000000;
  }
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: PoolETCBlocksInfo): number {
    return parseFloat(`${data.timestamp}`) * 1000;
  }
}
