import type { ethers } from 'ethers';
import type { ERC20Token, NetworkList } from '@asset-projects/token-list';

export type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.Web3Provider
  | ethers.providers.InfuraProvider;

export type ERC20Possession = ERC20Token & { balance: string };
export type ERC20PossessionList = ERC20Possession[];

export type InitialAcquistionList = {
  [key in NetworkList[number]]: string[];
};
