import { Controller, Get, Inject } from "@nestjs/common";
import axios from "axios";

@Controller()
export class TestController {
  constructor(
    @Inject('ETHERSCAN_TOKEN') private readonly token: string,
    @Inject('ETHERSCAN_URI') private readonly uri: string,
  ) {}
  @Get('/stat')
  async getBlock() {

    const stat = await axios.get(`${this.uri}/api?module=stats&action=dailyavghashrate&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=${this.token}`)
    return { stat: stat.data }
  }
}
