import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
class NewsElement {
  @Field()
  title: string;
  @Field({ nullable: true })
  link: string;
  @Field(() => [String], { nullable: true })
  keywords: string[];
  @Field(() => [String], { nullable: true })
  creator: string[];
  @Field({ nullable: true })
  video_url: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  content: string;
  @Field({ nullable: true })
  pubDate: string;
  @Field({ nullable: true })
  image_url: string;
  @Field({ nullable: true })
  source_id: string;
  @Field({ nullable: true })
  language: string;
  @Field(() => [String], { nullable: true })
  country: string[];
  @Field(() => [String], { nullable: true })
  category: string[];
}

@ObjectType()
export class NewsData {
  @Field(() => [NewsElement])
  data: NewsElement[];
  @Field()
  update_at: number;
}
