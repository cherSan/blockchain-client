import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCPaymentsPayment } from "./payments.model";
@Resolver(() => PoolETCPaymentsPayment)
export class PoolETCPaymentsPaymentResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: PoolETCPaymentsPayment) {
    return data.timestamp * 1000
  }
  @ResolveField(() => Number, {name: 'amount'})
  amount(@Parent() data: PoolETCPaymentsPayment) {
    return data.amount * 0.000000001
  }
}
