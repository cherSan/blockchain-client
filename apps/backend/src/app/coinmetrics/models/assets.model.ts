import { Field, ObjectType } from "@nestjs/graphql";
import { Assets } from "../constants/assets.constants";

@ObjectType({ description: 'Assets' })
export class CMAssets {
  @Field(() => [Assets])
  list: Assets[]
}
