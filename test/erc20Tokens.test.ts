import dotEnv from 'dotenv';
import type { Provider } from '../src/types';
import { createProvider } from './provider';
import { erc20Tokens } from '../src';

let provider: Provider | null = null;
let address = '';

jest.setTimeout(20000);

beforeAll(() => {
  dotEnv.config();

  provider = createProvider(process.env.JSON_RPC_URL) as Provider;
  address = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
});

describe('Test erc20Tokens', () => {
  it('default', async () => {
    const initialAcquistionAddressList: string[] = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
      '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72', //  ENS
      '0xea610b1153477720748dc13ed378003941d84fab', // ALIS (Does not exist in the list)
    ];

    const result = await erc20Tokens(provider, address, initialAcquistionAddressList);
    console.log(result);
    expect(result).toHaveLength(3);
  });
});
