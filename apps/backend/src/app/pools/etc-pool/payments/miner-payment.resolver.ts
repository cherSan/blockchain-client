import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerPayment } from "./miner-payments.model";

@Resolver(() => MinerPayment)
export class MinerPaymentResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: MinerPayment) {
    return data.timestamp * 1000
  }
}
