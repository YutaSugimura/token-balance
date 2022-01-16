import type { ERC20Token, NetworkList } from '@asset-projects/token-list';

export type ERC20Possession = ERC20Token & { balance: string };
export type ERC20PossessionList = ERC20Possession[];

export type InitialAcquistionList = {
  [key in NetworkList[number]]: string[];
};
