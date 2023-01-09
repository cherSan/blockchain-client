import {
  ICmAssetsListenSubscription,
  ICmAssetsGetQuery,
} from '@blockchain_client/graph-ql-client';
export type CmAssetsLoaderType =
  | ICmAssetsGetQuery['cmAssets']
  | ICmAssetsListenSubscription['cmAssets'];
