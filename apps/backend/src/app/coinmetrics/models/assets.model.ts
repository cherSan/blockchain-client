import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";

@ObjectType({ description: 'Coin Metrics Assets' })
export class CMAssets {
  @Field(() => [Assets])
  list: Assets[]
}
