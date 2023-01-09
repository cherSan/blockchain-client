import { Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { PoolETCBlocks, PoolETCBlocksLuck } from "./blocks.model";
import { PoolETCBlocksService } from "./blocks.service";
@Resolver(() => PoolETCBlocks)
export class PoolETCBlocksResolver {
  constructor(
    private readonly statsService: PoolETCBlocksService
  ) {
  }
  @Query(() => PoolETCBlocks, { name: 'poolEtcBlocks' })
  async poolEtcBlocksGet(): Promise<PoolETCBlocks> {
    try {
      return await this.statsService.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  @Subscription(() => PoolETCBlocks, { name: 'poolEtcBlocks' })
  async poolEtcBlocksSubscribe() {
    try {
      return this.statsService.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  @ResolveField(() => PoolETCBlocks, {name: 'luck'})
  luck(@Parent() data: PoolETCBlocks & {luck: {[key: number]: PoolETCBlocksLuck}}): PoolETCBlocksLuck[] {
    return Object.entries(data?.luck || {}).map(([block, value]) => {
      return {
        ...value,
        block: parseInt(block)
      }
    })
  }
}
