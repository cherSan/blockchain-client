import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { PoolETCFindersService } from "./finders.service";
import { PoolETCFinders } from "./finders.model";
@Resolver(() => PoolETCFinders)
export class PoolETCFindersResolver {
  constructor(
    private readonly service: PoolETCFindersService
  ) {
  }
  @Query(() => PoolETCFinders, { name: 'poolEtcFinders' })
  async poolEtcFindersGet(): Promise<PoolETCFinders> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => PoolETCFinders, {name: 'poolEtcFinders'})
  async poolEtcFindersSubscribe() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
