import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class PoolETCFindersFiner {
  @Field()
  address: string;
  @Field()
  blocks: number;
}
@ObjectType()
export class PoolETCFinders {
  @Field(() => [PoolETCFindersFiner])
  finders: PoolETCFindersFiner[]
}
