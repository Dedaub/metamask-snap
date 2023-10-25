import BigNumber from 'bignumber.js';

export const mapTokenToData = (tokenAddr: string, tokens: any) => {
  const tokenData = tokens[tokenAddr.toLowerCase()];
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
    amount: adjustedAmount.toString(),
    value: adjustedAmount.multipliedBy(lastPrice).toString(),
  };
};
