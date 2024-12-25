import {generateRandomNumber} from '@starkware-webapps/utils';

import {toHexLength} from './parser';
import {NetworkEnv} from './types';

export * from './ethereum';
export * from './parser';
export * from './starknet';
export * from './signature';
export * from './types';

export const generateRandomHex = (max = 10_000_000_000) => {
  return toHexLength(generateRandomNumber(max).toString(16));
};

export function resolveNetworkName(network: any): NetworkEnv {
  return network === 'main' ? 'main' : 'sepolia';
}
