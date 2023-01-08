import { Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
@Injectable()
export class PubSubService {
  private pubsub = new PubSub();
  public publish(key: string, data: unknown): Promise<void> {
    return this.pubsub.publish(key, data);
  }
  public subscribe<T>(key: string): AsyncIterator<T> {
    return this.pubsub.asyncIterator(key);
  }
}
