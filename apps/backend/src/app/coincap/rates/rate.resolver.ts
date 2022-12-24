import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { RatesInfo } from "./rate.model";
import { RateService } from "./rate.service";

@Resolver(() => RatesInfo)
export class RateResolver {
  constructor(
    private readonly service: RateService
  ) {
  }

  @Query(() => RatesInfo, { name: 'rates' })
  async getRates(): Promise<RatesInfo> {
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

  @Subscription(() => RatesInfo)
  async rates() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
