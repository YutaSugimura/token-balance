import { ethers } from 'ethers';
import type { Provider } from '../src/types';

export const createProvider = (url: string): Provider => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // const provider = new ethers.providers.InfuraProvider('homestead', {
  //   projectId: process.env.INFURA_PROJECT_ID,
  //   projectSecret: process.env.INFURA_PROJECT_SECRET,
  // });

  const provider = new ethers.providers.JsonRpcProvider(url);

  return provider;
};
