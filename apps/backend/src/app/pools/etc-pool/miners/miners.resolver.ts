import { Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import {PoolETCMiners, PoolETCMinersMiner } from "./miners.model";
import { PoolETCMinersService } from "./miners.service";
type ServerMinerList = {
  miners: {
    [key: string]: Object
  }
}
@Resolver(() => PoolETCMiners)
export class PoolETCMinersResolver {
  constructor(
    private readonly statsService: PoolETCMinersService
  ) {
  }
  @Query(() => PoolETCMiners, { name: 'poolEtcMiners' })
  async poolEtcMinersGet(): Promise<PoolETCMiners> {
    try {
      return await this.statsService.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  @Subscription(() => PoolETCMiners, { name: 'poolEtcMiners' })
  async poolEtcMinersSubscribe() {
    try {
      return this.statsService.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  @ResolveField(() => [PoolETCMinersMiner], { name: 'miners' })
  miners(@Parent() minerList: ServerMinerList) {
    return Object.entries(minerList.miners).map(([k,v]) => ({
      ...v,
      id: k
    }))
  }
}
