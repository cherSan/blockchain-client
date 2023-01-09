import {
  ICmMetricsListenSubscription,
  ICmMetricsGetQuery,
} from '@blockchain_client/graph-ql-client';
export type CmMetricsLoaderType =
  | ICmMetricsGetQuery['cmMetrics']
  | ICmMetricsListenSubscription['cmMetrics'];
