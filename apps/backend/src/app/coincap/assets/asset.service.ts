import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { AssetsInfo } from "./asset.model";

import {
  COINCAP_REST_CONNECTION_URL,
  COINCAP_REST_TIMER_UPDATE,
} from "../constants/connection.constants";
import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class AssetService extends ListenerService<AssetsInfo> {
  protected serviceKey = 'assets';
  constructor(
    @Inject(COINCAP_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(COINCAP_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(timer, uri, httpService, pubsub);
    this.observer$.subscribe();
  }
}
