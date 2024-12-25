import {RpcProvider, constants} from 'starknet';

import {ProviderName} from '.';

export type ApiKeyProviderConfig = {
  name: ProviderName;
  apiKey: string;
};

export type URLProviderConfig = {
  baseUrl: string;
};

export type ProviderConfig = ApiKeyProviderConfig | URLProviderConfig;

export type ProviderUrlMap = {
  [key in ProviderName]: ({apiKey, network}: {apiKey: string; network: string}) => string;
};

export type ProviderBundle = {
  provider: RpcProvider;
  isActive: boolean;
  retryDelayMultiplier: number;
};

export type ProvidersConfig = {
  chainId: constants.StarknetChainId;
  providers: Array<ProviderConfig>;
};
