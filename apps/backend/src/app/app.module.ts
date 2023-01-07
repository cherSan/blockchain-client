import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";

import { CoincapModule } from "./coincap/coincap.module";
import { EtcPoolModule } from "./etc-pool/etc-pool.module";
import { CryptopanicModule } from "./cryptopanic/cryptopanic.module";
import { NewsdataModule } from "./newsdata/newsdata.module";
import { CoinmetricsModule } from "./coinmetrics/coinmetrics.module";
import { MinerstatModule } from "./minerstat/minerstat.module";

@Module({
  imports: [
    EtcPoolModule,
    CoincapModule,
    CryptopanicModule,
    // MinerstatModule,
    NewsdataModule,
    CoinmetricsModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'apps/backend/src/schema.gql',
      graphiql: true,
      subscription: true,
      sortSchema: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://test:3Qlx7C2kbRQaUMtu@cluster0.0wawf.mongodb.net/?retryWrites=true&w=majority',
      database: 'blockchain',
      ssl: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      logging: true
    })
  ]
})
export class AppModule {}
