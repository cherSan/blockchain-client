import {
  IAssetsListenSubscription,
  IAssetsGetQuery,
} from '@blockchain_client/graph-ql-client';
export type AssetsLoaderType =
  | IAssetsGetQuery['assets']
  | IAssetsListenSubscription['assets'];
