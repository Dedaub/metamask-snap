export type AddressMapInfo = {
  /**
   *
   * @type {string}
   * @memberof AddressMapInfo
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof AddressMapInfo
   */
  logoSmall?: string;
};

export type BalanceDelta = {
  /**
   *
   * @type {string}
   * @memberof BalanceDelta
   */
  token: string;
  /**
   *
   * @type {string}
   * @memberof BalanceDelta
   */
  address: string;
  /**
   *
   * @type {string}
   * @memberof BalanceDelta
   */
  balance: string;
};

export type FullOuterTransaction = {
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  blockNumber: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  txIndex: number;
  /**
   *
   * @type {string}
   * @memberof FullOuterTransaction
   */
  txHash: string;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  gasPrice: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  gas: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  gasRefund: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  gasUsed: number;
  /**
   *
   * @type {string}
   * @memberof FullOuterTransaction
   */
  contractAddress?: string;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  blockTimestamp: number;
  /**
   *
   * @type {string}
   * @memberof FullOuterTransaction
   */
  toA?: string;
  /**
   *
   * @type {string}
   * @memberof FullOuterTransaction
   */
  fromA: string;
  /**
   *
   * @type {string}
   * @memberof FullOuterTransaction
   */
  blockHash: string;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  nonce: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  value?: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  baseFeePerGas?: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  priorityFeePerGas?: number;
  /**
   *
   * @type {number}
   * @memberof FullOuterTransaction
   */
  nativeTokenPrice?: number;
};
