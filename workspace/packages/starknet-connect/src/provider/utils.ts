import {constants} from 'starknet';

import {ProviderName} from './enums';
import {ApiKeyProviderConfig, ProviderUrlMap} from './types';

export const ProviderToNetworkMap = {
  [ProviderName.ALCHEMY]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  },
  [ProviderName.BLAST]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  },
  [ProviderName.CHAINSTACK]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  },
  [ProviderName.INFURA]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  }
};

export const ProviderToUrlMap: ProviderUrlMap = {
  [ProviderName.ALCHEMY]: ({apiKey, network}) =>
    `https://${network}.g.alchemy.com/starknet/version/rpc/v0_7/${apiKey}`,
  [ProviderName.BLAST]: ({apiKey, network}) => `https://${network}.blastapi.io/${apiKey}/rpc/v0_7`,
  [ProviderName.CHAINSTACK]: ({apiKey, network}) =>
    `https://${network}.core.chainstack.com/${apiKey}/rpc/v0_7`,
  [ProviderName.INFURA]: ({apiKey, network}) => `https://${network}.infura.io/v3/${apiKey}`
};

export const buildProviderUrl = (
  chainId: constants.StarknetChainId,
  config: ApiKeyProviderConfig
) => {
  const network = toProviderNetwork(chainId, config.name);
  return ProviderToUrlMap[config.name]({apiKey: config.apiKey, network});
};

export const toProviderNetwork = (
  chainId: constants.StarknetChainId,
  name: ProviderName
): string => {
  const networkName = ProviderToNetworkMap[name][chainId];

  if (networkName === null) {
    throw new Error(`Chain: ${chainId} is not supported for ${name}.`);
  }

  return networkName;
};
