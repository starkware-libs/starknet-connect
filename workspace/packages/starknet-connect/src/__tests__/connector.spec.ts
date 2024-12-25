import {expect} from 'chai';
import {Account} from 'starknet';

import {StarknetConnect} from '..';
import {ProviderProxy} from '../provider';

describe('StarknetConnect', () => {
  it('should create a Starknet Connect with an account and provider', () => {
    const connector = StarknetConnect.create({
      network: 'main',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        },
        {
          name: StarknetConnect.Provider.INFURA,
          apiKey: '2'
        },
        {
          name: StarknetConnect.Provider.CHAINSTACK,
          apiKey: '3'
        }
      ]
    });

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an('object');
  });

  it('should create a Starknet Connect without an account and provider', () => {
    const connector = StarknetConnect.create({
      network: 'sepolia',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: 'api-key'
        }
      ]
    });

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(ProviderProxy);
  });

  it('should create a Starknet Connect with only a provider', () => {
    const connector = StarknetConnect.create({
      network: 'main',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        },
        {
          name: StarknetConnect.Provider.INFURA,
          apiKey: '2'
        }
      ]
    });

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(ProviderProxy);
  });

  it('should create account after create a Starknet Connect', () => {
    const connector = StarknetConnect.create({
      network: 'sepolia',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        }
      ]
    });

    const account = connector.createAccount({address: '0x123', privateKey: '0x456'});

    expect(account).to.be.an.instanceOf(Account);
    expect(account.address).to.equal('0x123');
    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(ProviderProxy);
  });
});
