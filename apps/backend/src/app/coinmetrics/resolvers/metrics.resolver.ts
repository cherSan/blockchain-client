import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { CMMetrics } from "../models/metrics.model";
import { CMMetricsService } from "../services/metrics.service";
import { GraphQLError } from "graphql/error";
@Resolver(() => CMMetrics)
export class CMMetricsResolver {
  constructor(
    private readonly service: CMMetricsService
  ) {
  }
  @Query(() => CMMetrics, { name: 'cmMetrics' })
  async cmMetricsGet(): Promise<CMMetrics> {
    try {
      return await this.service.get()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  @Subscription(() => CMMetrics, { name: 'cmMetrics' })
  async cmMetricsSubscribe() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
