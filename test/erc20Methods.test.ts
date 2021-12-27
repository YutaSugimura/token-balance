import dotEnv from 'dotenv';
import type { Provider } from '../src/types';
import { createProvider } from './provider';
import { erc20Balance, erc20Decimals, erc20Name, erc20Symbol } from '../src/erc20/methods';

let provider: Provider | null = null;
let address = '';

beforeAll(() => {
  dotEnv.config();

  provider = createProvider(process.env.JSON_RPC_URL) as Provider;
  address = process.env.TARGET_ADDRESS ?? '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
});

const DAI_TOKEN = {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  name: 'Dai Stablecoin',
  symbol: 'DAI',
  decimals: 18,
};

const NONEXISTENT_TOKEN_ADDRESS = '0x333333333333333333333333333333333333333a';

describe('Test ERC20 methods', () => {
  it('Checking token name', async () => {
    const name = await erc20Name(provider, DAI_TOKEN.address);
    expect(name).toBe(DAI_TOKEN.name);
  });

  it('Checking token symbol', async () => {
    const symbol = await erc20Symbol(provider, DAI_TOKEN.address);
    expect(symbol).toBe(DAI_TOKEN.symbol);
  });

  it('Checking token decimals', async () => {
    const decimals = await erc20Decimals(provider, DAI_TOKEN.address);
    expect(decimals).toBe(DAI_TOKEN.decimals);
  });

  it('Checking token balance', async () => {
    const balance = await erc20Balance(provider, DAI_TOKEN.address, address);
    expect(balance).toBeDefined();
  });

  it('Name of a non-existent token', async () => {
    const name = await erc20Name(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(name).toBeUndefined();
  });

  it('Symbol of a non-existent token', async () => {
    const symbol = await erc20Symbol(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(symbol).toBeUndefined();
  });

  it('Decimals of a non-existent token', async () => {
    const decimals = await erc20Decimals(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(decimals).toBeUndefined();
  });

  it('Balance of a non-existent token', async () => {
    const balance = await erc20Balance(provider, NONEXISTENT_TOKEN_ADDRESS, address);
    expect(balance).toBeUndefined();
  });
});
