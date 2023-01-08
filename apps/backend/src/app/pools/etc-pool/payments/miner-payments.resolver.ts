import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { MinerPaymentsService } from "./miner-payments.service";
import { MinerPayments } from "./miner-payments.model";

@Resolver(() => MinerPayments)
export class MinerPaymentsResolver {
  constructor(
    private readonly service: MinerPaymentsService
  ) {
  }

  @Query(() => MinerPayments, { name: 'etcMinersPaymentsData' })
  async getMinersPaymentsData(): Promise<MinerPayments> {
    try {
      const recipe = await this.service.get()
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => MinerPayments)
  async etcMinersPaymentsData() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
