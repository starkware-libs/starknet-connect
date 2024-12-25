import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {Account} from 'starknet';

import {render} from '@testing-library/react';

import {StarknetConnect} from '../connector';
import {Provider} from '../index';
import {StarknetConnectConfig} from '../types';
import {
  StarknetConnectProvider,
  useStarknetConnectAccountCreator,
  useStarknetConnectProvider
} from '../wrapper/react';

const config: StarknetConnectConfig = {
  network: 'sepolia',
  providers: []
};

describe('React wrapper', () => {
  let mockedStarknetConnect: sinon.SinonStubbedInstance<StarknetConnect>;
  let staticCreateStub: sinon.SinonStub;

  before(() => {
    const mockedProvider = sinon.createStubInstance(Provider);
    const mockedAccount = sinon.createStubInstance(Account);
    mockedStarknetConnect = sinon.createStubInstance(StarknetConnect);
    mockedStarknetConnect.getProvider.returns(mockedProvider);
    mockedStarknetConnect.createAccount.returns(mockedAccount);
    staticCreateStub = sinon.stub(StarknetConnect, 'create').returns(mockedStarknetConnect);
  });

  afterEach(() => {
    sinon.reset();
  });

  after(() => {
    sinon.restore();
  });

  it('should instantiate one starknet connect instance, and provide provider and account creator ', async () => {
    const ProviderUsageComponent = () => {
      const provider = useStarknetConnectProvider();
      expect(provider instanceof Provider).to.be.true;
      const accountCreator = useStarknetConnectAccountCreator();
      const account = accountCreator({
        address: '',
        privateKey: ''
      });
      expect(account instanceof Account).to.be.true;
      return <div />;
    };

    render(
      <StarknetConnectProvider config={config}>
        <ProviderUsageComponent />
      </StarknetConnectProvider>
    );

    expect(staticCreateStub.calledOnce).to.be.true;
    expect(staticCreateStub.calledWith(config)).to.be.true;
    expect(mockedStarknetConnect.getProvider.called).to.be.true;
    expect(mockedStarknetConnect.createAccount.called).to.be.true;
  });
});
