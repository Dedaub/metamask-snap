import BigNumber from 'bignumber.js';
import { chainIdToNetwork } from './constants';

export const mapTokenToData = (tokenAddr: string, tokens: any) => {
  const tokenData = tokens[tokenAddr.toLowerCase()];
  if (!tokenData) {
    return {};
  }
  return {
    symbol: tokenData.symbol,
    name: tokenData.token_name,
    lastPrice: tokenData.last_price,
    decimals: tokenData.decimals,
  };
};

type TokenAmount = {
  decimalAmount: string;
  amount: string;
  value: string;
};

export const calcTokenAmounts = (
  hexTokenAmount: string,
  decimals: number,
  lastPrice: number,
): TokenAmount => {
  const decimalAmount = new BigNumber(hexTokenAmount, 16);
  const adjustedAmount = decimalAmount.dividedBy(new BigNumber(10 ** decimals));

  return {
    decimalAmount: decimalAmount.toString(),
    amount:
      adjustedAmount.toString() === 'NaN' ? 'N/A' : adjustedAmount.toString(),
    value:
      adjustedAmount.toString() === 'NaN'
        ? 'N/A'
        : adjustedAmount.multipliedBy(lastPrice).toString(),
  };
};

export const getNetworkName = (chaindId: string): string | false => {
  const hexChainIdStr = `0x${chaindId.split(':')[1]}`;
  const decimalChainIdStr = new BigNumber(hexChainIdStr, 16).toString();
  return chainIdToNetwork.get(decimalChainIdStr) || false;
};
