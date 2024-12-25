import {Account} from 'starknet';

import {ProviderName, ProviderProxy} from './provider';
import {AccountParams, StarknetConnectConfig} from './types';
import {getChainId} from './utils';

export class StarknetConnect {
  public static readonly Provider = ProviderName;

  private constructor(private readonly providerProxy: ProviderProxy) {}

  public static create(config: StarknetConnectConfig) {
    const {providers} = config;

    const chainId = getChainId(config);
    const providerProxy = ProviderProxy.create({chainId, providers});

    return new StarknetConnect(providerProxy);
  }

  public getProvider() {
    return this.providerProxy;
  }

  public createAccount({address, privateKey, cairoVersion, transactionVersion}: AccountParams) {
    return new Account(this.providerProxy, address, privateKey, cairoVersion, transactionVersion);
  }
}
