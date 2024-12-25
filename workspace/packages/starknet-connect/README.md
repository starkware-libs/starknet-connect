# Starknet Connect

This library primarily enables configuring multiple RPC providers by priority. If one provider becomes unavailable, the library will seamlessly fallback to the next, ensuring uninterrupted requests until a provider successfully responds. This feature is particularly useful for ensuring stable and reliable connectivity to the Starknet network, even in case of provider downtime.

_**Compatibility Note: This version is only compatible with Starknet RPC v7. Please ensure that your Starknet network is running on RPC v7 to utilize the features provided by this library effectively.**_

## Features

- Connect to Starknet networks (`main`, `sepolia` or a custom one).
- Configure multiple RPC providers by priority with automatic fallback.
- Create and manage Starknet accounts.
- Create and manage RPC Provider.
  Here's the refactored `Configuration` section of your README with the provided types for clarity:

---

## Configuration

The configuration involves several key objects that allow you to set up and customize your interaction with the Starknet blockchain. Below are details on the primary configuration objects and how to use them.

### `StarknetConnectConfig`

This configuration object defines the parameters needed to establish a connection to a specific Starknet network. It can be in one of two forms:

1. **Standard network configuration**

   - `network`: Specifies the network to connect to. Acceptable values are `main` for the main network and `sepolia` for the Sepolia test network.
   - `providers`: An array of `ProviderConfig` objects that detail the blockchain providers you wish to use for connecting to the Starknet network. Providers will be used in the order they are listed, with automatic fallback to the next provider in case the current one is unavailable.

   Example usage:

   ```typescript
   const starknetConnectConfig: StarknetConnectConfig = {
     network: 'main', // or 'sepolia' for the test network
     providers: [
       {
         name: 'ALCHEMY',
         apiKey: 'your-alchemy-api-key'
       },
       {
         baseUrl: 'https://private.custom-provider.com'
       }
     ]
   };
   ```

2. **Custom network configuration**

   - `chainId`: The chain ID corresponding to the Starknet network, typically obtained from `constants.StarknetChainId`, but can be custom.
   - `providers`: An array of `ProviderConfig` objects that detail the blockchain providers you wish to use for connecting to the Starknet network.

   Example usage:

   ```typescript
   const starknetConnectConfig: StarknetConnectConfig = {
     chainId: constants.StarknetChainId.MAINNET,
     providers: [
       {
         name: 'INFURA',
         apiKey: 'your-infura-api-key'
       },
       {
         baseUrl: 'https://private.custom-provider.com'
       }
     ]
   };
   ```

### `ProviderConfig`

The `ProviderConfig` type is a union of two types: `ApiKeyProviderConfig` and `URLProviderConfig`. It can take one of the following forms:

1. **ApiKeyProviderConfig**:

   - `name`: The name of the provider, referenced using the `ProviderName` enum.
   - `apiKey`: The API key provided by the service.

   Example usage:

   ```typescript
   const apiKeyProviderConfig: ApiKeyProviderConfig = {
     name: 'INFURA',
     apiKey: 'your-infura-api-key'
   };
   ```

2. **URLProviderConfig**:

   - `baseUrl`: The base URL of the provider.

   Example usage:

   ```typescript
   const urlProviderConfig: URLProviderConfig = {
     baseUrl: 'https://private.custom-provider.com'
   };
   ```

### `ProviderConfig` Example

You can combine both `ApiKeyProviderConfig` and `URLProviderConfig` in the `providers` array in the `StarknetConnectConfig` object:

```typescript
const starknetConnectConfig: StarknetConnectConfig = {
  network: 'main',
  providers: [
    {
      name: 'ALCHEMY',
      apiKey: 'your-alchemy-api-key'
    },
    {
      baseUrl: 'https://private.custom-provider.com'
    }
  ]
};
```

## Usage

### Connecting to Starknet

To connect to a Starknet network:

```typescript
import {StarknetConnect} from '@starkware-industries/starknet-connect';

const config = {
  network: 'main',
  providers: [
    // Your provider configurations
  ]
};

const starknetConnect = StarknetConnect.create(config);
```

### Managing Accounts

To create a new Starknet account, you can use the `createAccount` method from the `StarknetConnect` class. The `createAccount` method takes an object of type `AccountParams`, which includes the account's address, private key, and optional configuration for `cairoVersion` and `transactionVersion`.

#### `AccountParams`

The `AccountParams` type defines the parameters required to create a Starknet account:

```typescript
export type AccountParams = {
  address: string;
  privateKey: string;
  cairoVersion?: types.CairoVersion; // Optional: Specify the Cairo version (if required)
  transactionVersion?: ETransactionVersion.V2 | ETransactionVersion.V3; // Optional: Specify the transaction version (if required)
};
```

#### Creating a New Account

To create a new Starknet account, you can use the `createAccount` method. Here's an example of how to use it:

```typescript
const accountParams = {
  address: '0x...', // The Starknet account address
  privateKey: '0x...', // The private key for the Starknet account
  cairoVersion: '0.1', // Optional: Specify the Cairo version, if needed
  transactionVersion: ETransactionVersion.V2 // Optional: Specify the transaction version (V2 or V3)
};

const account = starknetConnect.createAccount(accountParams);
```

In the example above, the `createAccount` method will return a new `Account` instance, initialized with the specified parameters. The optional `cairoVersion` and `transactionVersion` can be used if specific versions are needed for the account.

### Using the Provider

To get the configured provider:

```typescript
import {StarknetConnect} from '@starkware-industries/starknet-connect';

// Example provider configuration for StarknetConnect using the Provider enum
const starknetConnectConfig = {
  network: 'main', // or 'sepolia' for the test network
  providers: [
    {
      name: StarknetConnect.Provider.ALCHEMY,
      apiKey: 'your-alchemy-api-key'
    },
    {
      name: StarknetConnect.Provider.BLAST,
      apiKey: 'your-blast-api-key'
    },
    {
      name: StarknetConnect.Provider.CHAINSTACK,
      apiKey: 'your-chainstack-api-key'
    },
    {
      name: StarknetConnect.Provider.INFURA,
      apiKey: 'your-infura-api-key'
    }
  ]
};

// To create a connection with the above configuration
const starknetConnect = StarknetConnect.create(starknetConnectConfig);

// Use the getProvider() method to get the configured provider
const provider = starknetConnect.getProvider();

const txHash = '0x123...';
const transactionDetails = await provider.getTransactionByHash(txHash);

// Log the transaction details to the console
console.log(transactionDetails);
```
