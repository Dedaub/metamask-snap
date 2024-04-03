export type TokenInfo = {
  /**
   *
   * @type {string}
   * @memberof TokenInfo
   */
  tokenAddress: string;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  chainId: number;
  /**
   *
   * @type {string}
   * @memberof TokenInfo
   */
  tokenName: string;
  /**
   *
   * @type {string}
   * @memberof TokenInfo
   */
  symbol: string;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  decimals: number;
  /**
   *
   * @type {string}
   * @memberof TokenInfo
   */
  presentationSymbol?: string;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  lastPrice?: number;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  lastCap?: number;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  lastTotalSupply?: number;
  /**
   *
   * @type {string}
   * @memberof TokenInfo
   */
  logoSmall?: string;
  /**
   *
   * @type {number}
   * @memberof TokenInfo
   */
  ts?: number;
};

export type TokenTransfer = {
  /**
   *
   * @type {string}
   * @memberof TokenTransfer
   */
  address: string;
  /**
   *
   * @type {string}
   * @memberof TokenTransfer
   */
  fromA: string;
  /**
   *
   * @type {string}
   * @memberof TokenTransfer
   */
  toA: string;
  /**
   *
   * @type {string}
   * @memberof TokenTransfer
   */
  amount: string;

  /**
   *
   * @type {string}
   * @memberof TokenTransfer
   */
  type: string;
};
