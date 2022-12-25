import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { ETCHistoryInfo } from "./history.model";
import { ETCHistoryService } from "./history.service";

@Resolver(() => ETCHistoryInfo)
export class ETCHistoryResolver {
  constructor(
    private readonly service: ETCHistoryService
  ) {
  }

  @Query(() => ETCHistoryInfo, { name: 'etcHistory' })
  async getHistory(): Promise<ETCHistoryInfo> {
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

  @Subscription(() => ETCHistoryInfo)
  async etcHistory() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
