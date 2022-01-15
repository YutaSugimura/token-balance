import dotEnv from 'dotenv';
import { createProvider } from './provider';
import { erc20Tokens } from '../src';

dotEnv.config();

export const fn = async () => {
  const JSON_RPC_URL = process.env.JSON_RPC_URL ?? '';
  const provider = createProvider(JSON_RPC_URL);

  const address = process.env.TARGET_ADDRESS ?? '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

  const tokens = await erc20Tokens(provider, address);
  console.log({ tokens });
};

fn();
