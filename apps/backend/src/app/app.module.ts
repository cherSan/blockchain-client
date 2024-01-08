import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";

/**
 * @deprecated The API should not be used
 */
// import { MinerstatModule } from "./minerstat/minerstat.module";
/**
 * @deprecated The API should not be used
 */
// import { CryptopanicModule } from "./cryptopanic/cryptopanic.module";
import { CoincapModule } from "./coincap/coincap.module";
import { NewsdataModule } from "./newsdata/newsdata.module";
import { CoinmetricsModule } from "./coinmetrics/coinmetrics.module";
import { PoolsModule } from "./pools/pools.module";

@Module({
  imports: [
    // CryptopanicModule,
    // MinerstatModule,
    PoolsModule,
    CoincapModule,
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
      url: '',
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
