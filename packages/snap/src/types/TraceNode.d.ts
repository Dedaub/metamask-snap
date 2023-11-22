import { SelectorInfo, ChildrenInner, SelfDestructOp } from './ChildrenInner.d';

export type TraceNode = {
  /**
   *
   * @type {SelfDestructOp}
   * @memberof TraceNode
   */
  opcode: SelfDestructOp;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  fromA: string;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  toA: string;
  /**
   *
   * @type {number}
   * @memberof TraceNode
   */
  vmStep: number;
  /**
   *
   * @type {number}
   * @memberof TraceNode
   */
  gasUsed: number;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  selector: string;
  /**
   *
   * @type {number}
   * @memberof TraceNode
   */
  callvalue: number;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  calldata?: string;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  signature?: string;
  /**
   *
   * @type {object}
   * @memberof TraceNode
   */
  calldataDecoded?: object;
  /**
   *
   * @type {ChildrenInner[]}
   * @memberof TraceNode
   */
  children?: ChildrenInner[];
  /**
   *
   * @type {SelectorInfo}
   * @memberof TraceNode
   */
  abi?: SelectorInfo;
  /**
   *
   * @type {Array<string>}
   * @memberof TraceNode
   */
  topics: string[];
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  memory: string;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  address: string;
  /**
   *
   * @type {object}
   * @memberof TraceNode
   */
  eventdataDecoded?: object;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  error?: string;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  returndata?: string;
  /**
   *
   * @type {object}
   * @memberof TraceNode
   */
  returndataDecoded?: object;
  /**
   *
   * @type {string}
   * @memberof TraceNode
   */
  beneficiary: string;
  /**
   *
   * @type {number}
   * @memberof TraceNode
   */
  value: number;
};
