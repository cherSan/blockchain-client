import { Module } from '@nestjs/common';
import { TestController } from "./test.controller";

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: 'ETHERSCAN_TOKEN',
      useValue:'GSBC28V3M5T31YVXASTDHF7NZZK6I29ETM'
    },
    {
      provide: 'ETHERSCAN_URI',
      useValue: 'https://api.etherscan.io/'
    }
  ]
})
export class EthersModule {}
