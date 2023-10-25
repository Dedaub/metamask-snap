import detectEthereumProvider from '@metamask/detect-provider';

// type MetaMaskEthereumProvider = {
//   isMetaMask?: boolean;
//   once(eventName: string | symbol, listener: (...args: any[]) => void): this;
//   on(eventName: string | symbol, listener: (...args: any[]) => void): this;
//   off(eventName: string | symbol, listener: (...args: any[]) => void): this;
//   addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
//   removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
//   removeAllListeners(event?: string | symbol): this;
// }

// type Provider = MetaMaskEthereumProvider & {
//   request<T>: (args: any) => Promise<T>;
// }

// https://github.com/MetaMask/detect-provider/issues/68

export const useIsMetamaskFlask = async () => {
  const provider = await detectEthereumProvider();

  const isFlask = (
    await (provider as any)?.request({ method: 'web3_clientVersion' })
  )?.includes('flask');

  if (provider && isFlask) {
    console.log('MetaMask Flask successfully detected!');
    return true;
  }
  console.error('Please install MetaMask Flask!');
  return false;
};
