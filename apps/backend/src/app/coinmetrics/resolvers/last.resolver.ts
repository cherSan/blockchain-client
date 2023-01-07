import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMOneHourService } from "../services/one-hour.service";
import { CmLast } from "../models/last-data.model";

@Resolver(() => CmLast)
export class CMLastResolver {
  constructor(
    private readonly service: CMOneHourService
  ) {
  }

  @Query(() => CmLast, { name: 'cmLast' })
  async getCMOneHour(): Promise<CmLast> {
    try {
      return await this.service.getLastState()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CmLast)
  async cmLast() {
    try {
      return this.service.subscribeLastState();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
