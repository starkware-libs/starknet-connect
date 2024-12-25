import {constants, types} from 'starknet';
import type {ETransactionVersion} from 'starknet-types';

import type {NetworkEnv} from '@starkware-webapps/web3-utils';

import {ProviderConfig} from './provider';

export type NetworkChainIdMap = {
  [key in NetworkEnv]: constants.StarknetChainId;
};

export type AccountParams = {
  address: string;
  privateKey: string;
  cairoVersion?: types.CairoVersion;
  transactionVersion?: ETransactionVersion.V2 | ETransactionVersion.V3;
};

export type StarknetConnectConfig =
  | {
      network: NetworkEnv;
      providers: Array<ProviderConfig>;
    }
  | {
      chainId: constants.StarknetChainId;
      providers: Array<ProviderConfig>;
    };
