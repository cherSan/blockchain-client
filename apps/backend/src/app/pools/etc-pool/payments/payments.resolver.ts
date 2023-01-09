import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { PoolETCPaymentsService } from "./payments.service";
import { PoolETCPayments } from "./payments.model";

@Resolver(() => PoolETCPayments)
export class PoolETCPaymentsResolver {
  constructor(
    private readonly service: PoolETCPaymentsService
  ) {
  }
  @Query(() => PoolETCPayments, { name: 'poolEtcPayments' })
  async poolEtcPaymentsGet(): Promise<PoolETCPayments> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => PoolETCPayments, {name: 'poolEtcPayments'})
  async poolEtcPaymentsSubscribe() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
