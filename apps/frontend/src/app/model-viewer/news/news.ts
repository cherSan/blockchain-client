import { IListenNewsDataSubscription, INewsDataQuery } from "@blockchain_client/graph-ql-client";

export type News = INewsDataQuery['newsData'] | IListenNewsDataSubscription['newsData'];
