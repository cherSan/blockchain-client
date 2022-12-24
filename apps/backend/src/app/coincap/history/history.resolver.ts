import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { HistoryInfo } from "./history.model";
import { HistoryService } from "./history.service";

@Resolver(() => HistoryInfo)
export class HistoryResolver {
  constructor(
    private readonly service: HistoryService
  ) {
  }

  @Query(() => HistoryInfo, { name: 'history' })
  async getHistory(): Promise<HistoryInfo> {
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

  @Subscription(() => HistoryInfo)
  async history() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
