import {constants} from 'starknet';

export type EthereumAddress = `${'0x'}${string & {length: 40}}`;
export type StarknetAddress = `${'0x'}${string & {length: 64}}`;

export type NetworkEnv = 'main' | 'sepolia';

export type StarknetNetworkName = constants.NetworkName;
export type StarknetChainId = constants.StarknetChainId;
