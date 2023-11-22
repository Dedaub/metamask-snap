export declare const SelfDestructOp: {
  readonly Selfdestruct: 'SELFDESTRUCT';
};

export type SelfDestructOp =
  (typeof SelfDestructOp)[keyof typeof SelfDestructOp];

export type SelectorInfo = {
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  selector?: string;
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  signature?: string;
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  name: string;
  /**
   *
   * @type {Array<object>}
   * @memberof SelectorInfo
   */
  inputs: object[];
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  address?: string;
  /**
   *
   * @type {Array<object>}
   * @memberof SelectorInfo
   */
  outputs?: object[];
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  type?: string;
  /**
   *
   * @type {string}
   * @memberof SelectorInfo
   */
  stateMutability?: string;
};

export type ChildrenInner = {
  /**
   *
   * @type {SelfDestructOp}
   * @memberof ChildrenInner
   */
  opcode: SelfDestructOp;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  fromA: string;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  toA: string;
  /**
   *
   * @type {number}
   * @memberof ChildrenInner
   */
  vmStep: number;
  /**
   *
   * @type {number}
   * @memberof ChildrenInner
   */
  gasUsed: number;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  selector: string;
  /**
   *
   * @type {number}
   * @memberof ChildrenInner
   */
  callvalue: number;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  calldata?: string;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  signature?: string;
  /**
   *
   * @type {object}
   * @memberof ChildrenInner
   */
  calldataDecoded?: object;
  /**
   *
   * @type {Array<ChildrenInner>}
   * @memberof ChildrenInner
   */
  children?: ChildrenInner[];
  /**
   *
   * @type {SelectorInfo}
   * @memberof ChildrenInner
   */
  abi?: SelectorInfo;
  /**
   *
   * @type {Array<string>}
   * @memberof ChildrenInner
   */
  topics: string[];
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  memory: string;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  address: string;
  /**
   *
   * @type {object}
   * @memberof ChildrenInner
   */
  eventdataDecoded?: object;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  error?: string;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  returndata?: string;
  /**
   *
   * @type {object}
   * @memberof ChildrenInner
   */
  returndataDecoded?: object;
  /**
   *
   * @type {string}
   * @memberof ChildrenInner
   */
  beneficiary: string;
  /**
   *
   * @type {number}
   * @memberof ChildrenInner
   */
  value: number;
};
