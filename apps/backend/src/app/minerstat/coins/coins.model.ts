import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'This is a detailed documentation on how you can use minerstat coins API. By calling the main endpoint you can obtain data for all coins and multi pools that are available in the minerstat database. By including different GET parameters, you can limit the obtained data to specific list of coins or to specific list of algorithms.' })
export class Coins {
  @Field({ description: 'Unique identifier of the coin.' })
  id: string;
  @Field({ description: 'Coin\'s ticker.' })
  coin: string;
  @Field({ description: 'Coin\'s name.' })
  name: string;
  @Field({ description: 'Coin\'s type. It can be coin or pool, where pool is multi pool, such as NiceHash, Zpool, etc.' })
  type: string;
  @Field({ description: 'Coin\'s algorithm.' })
  algorithm: string;
  @Field({ description: 'Coin\'s network hashrate in H/s. If coin has no data on network hashrate, the network hashrate is -1.' })
  network_hashrate: number
  @Field({ description: 'Coin\'s difficulty. If coin has no data on difficulty, the difficulty is -1.' })
  difficulty: number
  @Field({ description: 'Coin\'s reward for 1 H/s for 1 hour of mining based on the most current difficulty. If coin has no data on reward, the reward is -1.' })
  reward: number
  @Field({ description: 'Coin\'s reward unit. If a coin is multi pool, the reward unit can be BTC or XMR or whichever reward is provided by the multi pool.' })
  reward_unit: string
  @Field({ description: 'Coin\'s block reward. If coin has no data on the block\'s reward, the block\'s reward is -1.' })
  reward_block: number
  @Field({ description: 'Coin\'s price in USD. If coin has no data on price, the price is -1.' })
  price: number
  @Field({ nullable: true, description: 'Coin\'s last 24h volume in USD. If coin has no data on volume, the volume is -1.' })
  volume: number
  @Field({ description: 'The UNIX timestamp of the last time the coin was updated.' })
  updated: number
}
