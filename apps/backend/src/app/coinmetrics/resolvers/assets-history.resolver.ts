import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMAssetsHistoryService } from "../services/assets-history.service";
import { CMAssetsHistory } from "../models/assets-history.model";

@Resolver(() => CMAssetsHistory)
export class CMAssetsHistoryResolver {
  constructor(
    private readonly service: CMAssetsHistoryService
  ) {
  }
  @Query(() => CMAssetsHistory, { name: 'cmAssetsHistory' })
  async cmAssetHistoryGet(): Promise<CMAssetsHistory> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CMAssetsHistory, { name: 'cmAssetsHistory' })
  async cmAssetHistorySubscribe() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
