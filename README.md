# @asset-projects/token-balance

[![Test](https://github.com/asset-project/token-balance/actions/workflows/node.js.yml/badge.svg)](https://github.com/asset-project/token-balance/actions/workflows/node.js.yml)

A library for retrieving the amount of ERC20 tokens held by a specific address.

## Install on your project

```zsh
  # npm
  npm i @asset-projects/token-balance

  # yarn
  yarn add @asset-projects/token-balance
```

# How to Use

1. Install ethers

```zsh
  # npm
  npm i ethers

  # yarn
  yarn add ethers
```

2. Implementation

```ts
import { ethers } from 'ethers';
import { erc20Tokens } from '@asset-projects/token-balance';

/** Prepare a provider */
const provider = new ethers.providers.JsonRpcProvider(url);

// or
const provider = new ethers.providers.InfuraProvider('homestead', {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

/** Main */
const tokens = await erc20Tokens(provider, address);
console.log({ tokens });
/**
 * {
 *   tokens: [
 *     {
 *       chainId: 1,
 *       type: 'ERC20',
 *       address: '0x6b175474e89094c44da98b954eedeac495271d0f',
 *       name: 'Dai Stablecoin',
 *       symbol: 'Dai',
 *       decimals: 18,
 *       logoURI: 'https://raw.githubusercontent.com/asset-project/token-list/main/public/dai.png'
 *       balance: '100.100000000000000000',
 *     }
 *   ]
 * }
 */
```
