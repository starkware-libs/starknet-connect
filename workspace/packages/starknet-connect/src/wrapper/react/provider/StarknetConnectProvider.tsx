import React, {useContext, useRef} from 'react';
import {Account} from 'starknet';

import {StarknetConnect} from '../../../connector';
import {Provider} from '../../../index';
import {AccountParams, StarknetConnectConfig} from '../../../types';

const StarknetConnectContext = React.createContext<StarknetConnect | null>(null);

export interface StarknetConnectProviderInput {
  config: StarknetConnectConfig;
  children: React.ReactNode;
}

export function StarknetConnectProvider({
  children,
  config
}: StarknetConnectProviderInput): React.ReactElement {
  const connector = useRef(StarknetConnect.create(config));
  return (
    <StarknetConnectContext.Provider value={connector.current}>
      {children}
    </StarknetConnectContext.Provider>
  );
}

function useStarknetConnector() {
  const connector = useContext(StarknetConnectContext);
  if (!connector) {
    throw new Error(
      'Any Starknet connection usage must be used within a StarknetConnectProvider context'
    );
  }
  return connector;
}

export function useStarknetConnectProvider(): Provider {
  const connector = useStarknetConnector();
  return connector.getProvider();
}

export function useStarknetConnectAccountCreator(): (accountParams: AccountParams) => Account {
  const connector = useStarknetConnector();
  return (accountParams: AccountParams) => {
    return connector.createAccount(accountParams);
  };
}
