import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'Pool difficulty' })
export class Coins {
  @Field()
  labels: string[];
  @Field()
  data: number[];
}
