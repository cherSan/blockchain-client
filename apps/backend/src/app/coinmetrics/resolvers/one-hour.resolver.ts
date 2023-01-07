import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { CMOneHourService } from "../services/one-hour.service";
import { CmOneHour } from "../models/one-hour.model";

@Resolver(() => CmOneHour)
export class CMOneHourResolver {
  constructor(
    private readonly service: CMOneHourService
  ) {
  }

  @Query(() => CmOneHour, { name: 'cmOneHour' })
  async getCMOneHour(): Promise<CmOneHour> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CmOneHour)
  async cmOneHour() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
