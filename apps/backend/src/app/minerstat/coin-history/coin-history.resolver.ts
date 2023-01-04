import { Args, Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { CoinHistory } from "./coin-history.model";
import { CoinHistoryService } from "./coin-history.service";

@Resolver(() => CoinHistory)
export class CoinHistoryResolver {
  constructor(
    private readonly service: CoinHistoryService
  ) {
  }

  @Query(() => CoinHistory, { name: 'coinHistory' })
  async getCoinHistory(
    @Args('coin') coin: string,
    @Args('algorithm') algorithm: string
  ): Promise<CoinHistory> {
    try {
      const recipe = await this.service.getCoinHistory(coin, algorithm);
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CoinHistory)
  async coinHistory(
    @Args('coin') coin: string,
    @Args('algorithm') algorithm: string
  ) {
    try {
      return this.service.subscribeCoinHistory(coin, algorithm);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
