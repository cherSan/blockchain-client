import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMOneDayService } from "../services/one-day.service";
import { CmOneDay } from "../models/one-day.model";

@Resolver(() => CmOneDay)
export class CMOneDayResolver {
  constructor(
    private readonly service: CMOneDayService
  ) {
  }

  @Query(() => CmOneDay, { name: 'cmOneDay' })
  async getCMOneDay(): Promise<CmOneDay> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CmOneDay)
  async cmOneDay() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
