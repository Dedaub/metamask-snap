import BigNumber from 'bignumber.js';

export const mapTokenToData = (tokenAddr: string, tokens: any) => {
  const tokenData = tokens[tokenAddr.toLowerCase()];
  console.log('mapTokenToData', { tokenAddr, tokens, tokenData });
  return {
    symbol: tokenData.symbol,
    name: tokenData.token_name,
    lastPrice: tokenData.last_price,
    decimals: tokenData.decimals,
  };
};

export const calcTokenAmounts = (
  hexTokenAmount: string,
  decimals: number,
  lastPrice: number,
) => {
  const decimalAmount = new BigNumber(hexTokenAmount, 16);
  const adjustedAmount = decimalAmount.dividedBy(new BigNumber(10 ** decimals));

  console.log('calcTokenAmounts', {
    hexTokenAmount,
    decimalAmount,
    decimals,
    adjustedAmount,
    lastPrice,
  });

  console.log('calcTokenAmounts 2', {
    decimalAmount: decimalAmount.toString(),
    amount: adjustedAmount.toString(),
    value: adjustedAmount.multipliedBy(lastPrice).toString(),
  });

  return {
    decimalAmount: decimalAmount.toString(),
    amount: adjustedAmount.toString(),
    value: adjustedAmount.multipliedBy(lastPrice).toString(),
  };
};
