
# Starknet-Connect React Wrapper

A React wrapper for the `starknet-connect` library, enabling seamless integration of StarkNet features into React applications. It includes a context provider and hooks for interacting with the `starknet-connect` instance.

## Getting Started

### Setup the Provider

Wrap your application (or the part of your app that needs StarkNet features) with the `StarknetConnectProvider`. The provider initializes the `starknet-connect` instance and makes it accessible through React Context.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StarknetConnectProvider } from '@starkware-industries/starknet-connect/react';

const starknetConfig = {
  network: 'mainnet', // Or use your desired NetworkEnv value
  providers: [
    {
      name: 'infura',
      apiKey: 'your-api-key', // Replace with your API key
    },
    {
      baseUrl: 'https://your-custom-rpc-url', // For custom RPC endpoints
    },
  ],
};

function App() {
  return (
    <StarknetConnectProvider config={starknetConfig}>
      {/* Your application components */}
    </StarknetConnectProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Hooks

The React wrapper provides several hooks to interact with the `starknet-connect` instance.

#### `useStarknetConnectProvider`

Retrieve the `Provider` instance to interact with the StarkNet blockchain.

```tsx
import { useStarknetConnectProvider } from '@starkware-industries/starknet-connect/react';

function ExampleComponent() {
  const provider = useStarknetConnectProvider();

  // Use the provider to interact with the StarkNet blockchain
  console.log(provider);
  return <div>Check the console for the provider instance.</div>;
}
```

#### `useStarknetConnectAccountCreator`

Create accounts for interacting with StarkNet.

```tsx
import { useStarknetConnectAccountCreator } from '@starkware-industries/starknet-connect/react';

function ExampleComponent() {
  const createAccount = useStarknetConnectAccountCreator();

  const handleCreateAccount = () => {
    const account = createAccount({
      address: '0x123...',
      privateKey: '0xabc...', // Replace with your private key
      cairoVersion: '1.0',    // Optional Cairo version
      transactionVersion: 'V3', // Optional transaction version
    });
    console.log(account);
  };

  return <button onClick={handleCreateAccount}>Create Account</button>;
}
```

## API Reference

### `<StarknetConnectProvider>`

#### Props

| Name       | Type                           | Description                                             |
|------------|--------------------------------|---------------------------------------------------------|
| `config`   | `StarknetConnectConfig`        | Configuration object for initializing `starknet-connect`. |
| `children` | `React.ReactNode`              | The React component tree to be wrapped.                |

#### `StarknetConnectConfig`

The `config` object used to initialize the `starknet-connect` instance can have one of the following structures:

1. **Network Configuration**:
   ```ts
   {
     network: NetworkEnv; // Example: 'mainnet', 'testnet'
     providers: Array<ProviderConfig>; // List of providers
   }
   ```

2. **Chain ID Configuration**:
   ```ts
   {
     chainId: constants.StarknetChainId; // Example: '0x534e5f4d41494e' for mainnet
     providers: Array<ProviderConfig>; // List of providers
   }
   ```

#### `ProviderConfig`

The `providers` array specifies the configurations for connecting to StarkNet. It supports two types:

1. **API Key-Based Provider**:
   ```ts
   {
     name: ProviderName; // Example: 'infura', 'alchemy'
     apiKey: string; // API key for the provider
   }
   ```

2. **Custom URL-Based Provider**:
   ```ts
   {
     baseUrl: string; // RPC endpoint URL
   }
   ```

### Hooks

#### `useStarknetConnectProvider`

Returns the `Provider` instance for interacting with the StarkNet blockchain.

#### `useStarknetConnectAccountCreator`

Returns a function to create accounts. The function accepts an `AccountParams` object and returns an `Account`.

#### `AccountParams`

The `AccountParams` object specifies the details for creating a StarkNet account:
```ts
{
  address: string; // Account address
  privateKey: string; // Private key for the account
  cairoVersion?: types.CairoVersion; // Optional Cairo version (e.g., '1.0')
  transactionVersion?: ETransactionVersion.V2 | ETransactionVersion.V3; // Optional transaction version
}
```

## Notes

- Ensure all components using these hooks are wrapped in a `<StarknetConnectProvider>`.
- The `StarknetConnect` instance is initialized once and persists across the React component tree.