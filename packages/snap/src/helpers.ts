import BigNumber from 'bignumber.js';
import { Json } from '@metamask/snaps-types';
import lzString from 'lz-string';
import { chainIdToNetwork } from './constants';

export const hasTxReverted = (
  traceNode: any,
): { txReverted: boolean; txError: string } => {
  if (!traceNode?.children) {
    return { txReverted: false, txError: '' };
  }

  const childrenLength = traceNode?.children.length;
  const lastChild = traceNode.children[childrenLength];
  if (lastChild?.opcode === 'REVERT') {
    return { txReverted: true, txError: lastChild.error };
  }

  return { txReverted: false, txError: '' };
};

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
      adjustedAmount.toString() === 'NaN' ? 'N/A' : adjustedAmount.toFixed(4),
    value:
      adjustedAmount.toString() === 'NaN'
        ? 'N/A'
        : adjustedAmount.multipliedBy(lastPrice).toFixed(2),
  };
};

export const getNetworkName = (chaindId: string): string | false => {
  const hexChainIdStr = `0x${chaindId.split(':')[1]}`;
  const decimalChainIdStr = new BigNumber(hexChainIdStr, 16).toString();
  return chainIdToNetwork.get(decimalChainIdStr) || false;
};

export const getContractLibrarySimulateUrl = (
  transaction: {
    [key: string]: Json;
  },
  network: string,
): string => {
  const { data, from, gas, to, value } = transaction;
  const adjustedGas = data ? gas : '0x520C'; // TXs with empty data should have fixed gas to simulate
  const encodedData = lzString.compressToEncodedURIComponent(
    `d=${data?.toString().slice(2) || ''},f=${from?.toString().slice(2)},t=${to
      ?.toString()
      .slice(2)},g=${adjustedGas?.toString().slice(2)},v=${value
      ?.toString()
      .slice(2)}`,
  );
  return `https://library.dedaub.com/${network}/tx/0x0/simulate/0?query=${encodedData}`;
};
