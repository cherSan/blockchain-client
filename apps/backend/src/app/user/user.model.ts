import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectID } from "typeorm";

@ObjectType({ description: 'user' })
export class User {
  @Field(type => ID)
  id: ObjectID;

  @Field()
  title: string;
}
