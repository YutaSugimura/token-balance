import { tokenList } from '@asset-projects/token-list';
import type { ERC20Possession, ERC20PossessionList, Provider } from '../types';
import { initialAcquistionList } from './initialAcquisitionList';
import { CHAIN_ID_LIST } from '../networks';
import { erc20Balance, erc20Decimals, erc20Name, erc20Symbol } from './methods';

export const notExist = async (
  provider: Provider,
  chainId: number,
  contractAddress: string,
  targetAddress: string,
) => {
  const balance = await erc20Balance(provider, contractAddress, targetAddress);

  if (!balance || Number(balance) === 0) {
    return;
  }

  const newItem: ERC20Possession = {
    chainId,
    type: 'ERC20',
    address: contractAddress,
    name: '',
    symbol: '',
    decimals: 0,
    logoURI: 'https://raw.githubusercontent.com/asset-project/token-list/main/public/empty.png',
    balance,
  };

  await Promise.all([
    (async () => {
      const name = await erc20Name(provider, contractAddress);
      if (name) newItem.name = name;
    })(),
    (async () => {
      const symbol = await erc20Symbol(provider, contractAddress);
      if (symbol) newItem.symbol = symbol;
    })(),
    (async () => {
      const decimals = await erc20Decimals(provider, contractAddress);
      if (decimals) newItem.decimals = decimals;
    })(),
  ]);

  return newItem;
};

/** Main */
export const erc20Tokens = async (
  provider: Provider,
  targetAddress: string,
  initialAcquistionAddressList?: string[],
) => {
  const list: ERC20PossessionList = [];

  const network = await provider.getNetwork();
  const filterNetworks = CHAIN_ID_LIST.filter((item) => item.chainId === network.chainId);

  if (!filterNetworks.length) {
    return list;
  }

  const targetNetworkName = filterNetworks[0].name;
  const targetTokenList = tokenList()[targetNetworkName].ERC20;
  const targetAddressList =
    initialAcquistionAddressList ?? initialAcquistionList[targetNetworkName];

  for (const contractAddress of targetAddressList) {
    const tokenData = targetTokenList.filter((item) => item.address === contractAddress);

    if (!tokenData.length) {
      const noExistItem = await notExist(
        provider,
        filterNetworks[0].chainId,
        contractAddress,
        targetAddress,
      );

      if (!noExistItem) {
        continue;
      }

      list.push(noExistItem);
      continue;
    }

    const balance = await erc20Balance(provider, contractAddress, targetAddress);

    if (balance && Number(balance) > 0) {
      list.push({
        ...tokenData[0],
        balance,
      });
    }
  }

  return list;
};
