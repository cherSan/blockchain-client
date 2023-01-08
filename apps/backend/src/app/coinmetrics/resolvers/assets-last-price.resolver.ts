import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMPriceHistoryService } from "../services/price-history.service";
import { CMAssetsLastPrice } from "../models/last-price.model";
@Resolver(() => CMAssetsLastPrice)
export class CMAssetsLastPriceResolver {
  constructor(
    private readonly service: CMPriceHistoryService
  ) {
  }
  @Query(() => CMAssetsLastPrice, { name: 'cmAssetsLastPrice' })
  async cmLastPriceGet(): Promise<CMAssetsLastPrice> {
    try {
      return await this.service.getLastPrice()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CMAssetsLastPrice, { name: 'cmAssetsLastPrice' })
  async cmLastPriceSubscribe() {
    try {
      return this.service.subscribeLastPrice();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
