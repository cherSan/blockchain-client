import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMPriceHistoryService } from "../services/price-history.service";
import { CMAssetsPriceHistory } from "../models/price-history.model";

@Resolver(() => CMAssetsPriceHistory)
export class CMAssetsPriceHistoryResolver {
  constructor(
    private readonly service: CMPriceHistoryService
  ) {
  }
  @Query(() => CMAssetsPriceHistory, { name: 'cmAssetsPriceHistory' })
  async cmAssetsPriceHistoryGet(): Promise<CMAssetsPriceHistory> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CMAssetsPriceHistory, { name: 'cmAssetsPriceHistory' })
  async cmAssetsPriceHistorySubscribe() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
