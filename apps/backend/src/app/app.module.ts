import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";

import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.gql',
      graphiql: true,
      subscription: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://test:3Qlx7C2kbRQaUMtu@cluster0.0wawf.mongodb.net/?retryWrites=true&w=majority',
      database: 'blockchain',
      ssl: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true
    })
  ],
})
export class AppModule {}
