import {constants} from 'starknet';

import {assert} from '@starkware-webapps/utils';

import {NetworkChainIdMap, StarknetConnectConfig} from './types';

export const NetworkToChainIdMap: NetworkChainIdMap = {
  main: constants.StarknetChainId.SN_MAIN,
  sepolia: constants.StarknetChainId.SN_SEPOLIA
};

export const getChainId = (starknet: StarknetConnectConfig): constants.StarknetChainId => {
  if ('chainId' in starknet) {
    return starknet.chainId;
  }

  assert.defined(starknet.network, 'network');

  const chainId = NetworkToChainIdMap[starknet.network];

  if (!chainId) {
    throw new Error(`Unsupported network: ${starknet.network}.`);
  }

  return chainId;
};
