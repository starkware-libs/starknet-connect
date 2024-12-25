import {RpcProvider} from 'starknet';

import {ProviderManager} from './manager';
import {ProvidersConfig} from './types';

export class ProviderProxy extends RpcProvider {
  private constructor(private readonly manager: ProviderManager) {
    super({default: true});
  }

  public static create(config: ProvidersConfig): ProviderProxy {
    const manager = ProviderManager.create(config);
    const provider = new ProviderProxy(manager);

    const handler: ProxyHandler<ProviderProxy> = {
      get(target: ProviderProxy, prop: string) {
        // @ts-ignore
        if (typeof target[prop] === 'function') {
          return (...args: any[]) => {
            return target.manager.call(async (provider: RpcProvider) => {
              // @ts-ignore
              const method = provider[prop];
              if (typeof method === 'function') {
                return await method.apply(provider, args);
              }
              throw new Error(`${prop} is not a function on the RpcProvider`);
            });
          };
        } else if (prop in target) {
          return target.manager.read((provider: RpcProvider) => {
            // @ts-ignore
            return provider[prop];
          });
        }

        // @ts-ignore
        return target[prop];
      }
    };

    return new Proxy(provider, handler);
  }
}
