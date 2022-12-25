import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Source {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  region: string;
  @Field({ nullable: true })
  domain: string;
  @Field({ nullable: true })
  path: string;
}

@ObjectType()
class Currencies {
  @Field()
  code: string;
  @Field()
  title: string;
}


@ObjectType({ description: 'news' })
export class CryptoNews {
  @Field()
  id: string;
  @Field()
  kind: string;
  @Field()
  domain: string;
  @Field()
  title: string;
  @Field()
  published_at: string;
  @Field({ nullable: true })
  symbol: string;
  @Field({ nullable: true })
  slug: string;
  @Field({ nullable: true })
  url: string;
  @Field()
  created_at: string;

  @Field(() => [Currencies], { nullable: true })
  currencies: Currencies[];
  @Field(() => Source, { nullable: true })
  source: Source;
}

