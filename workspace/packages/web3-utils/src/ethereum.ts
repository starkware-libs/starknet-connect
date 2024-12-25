import {ChainTypeL1} from '@starkware-webapps/enums';

import {generateRandomHex} from './index';
import {toHexLength} from './parser';

export const toEthereumAddress = (address: string) => {
  return toHexLength(address, 40);
};

export const toEthereumSignature = (signature: string) => {
  return toHexLength(signature, 130);
};

export const toEthereumChainId = (chainId: string): ChainTypeL1 => {
  switch (chainId) {
    case 'main':
      return ChainTypeL1.MAIN;
    case 'goerli':
      return ChainTypeL1.GOERLI;
    case 'sepolia':
      return ChainTypeL1.SEPOLIA;
    default:
      return ChainTypeL1.SEPOLIA;
  }
};

export const generateEthereumSignature = () => {
  return toEthereumSignature(`${generateRandomHex()}1c`);
};

export const ETHER_TOKEN_ADDRESS = '0x0000000000000000000000000000000000455448';
