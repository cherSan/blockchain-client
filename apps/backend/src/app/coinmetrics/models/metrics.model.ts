import { Field, ObjectType } from "@nestjs/graphql";
import { Metrics } from "../constants/assets.constants";
@ObjectType({ description: 'Asset Metrics' })
export class CMMetric {
  @Field(() => Metrics)
  metric: Metrics;
  @Field()
  description: string;
  @Field()
  unit: string;
}
@ObjectType({ description: 'Assets Metrics' })
export class CMMetrics {
  @Field(() => [Metrics])
  list: Metrics[]
  @Field(() => [CMMetric])
  data: CMMetric[]
}
