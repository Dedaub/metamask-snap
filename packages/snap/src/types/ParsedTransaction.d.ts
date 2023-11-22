import type {
  AddressMapInfo,
  BalanceDelta,
  FullOuterTransaction,
} from './AddressMapInfo.d';
import type { TokenInfo, TokenTransfer } from './Token.d';
import type { TraceNode } from './TraceNode.d';

export type ParsedTransaction = {
  /**
   *
   * @type {TraceNode}
   * @memberof ParsedTransaction
   */
  trace_node: TraceNode;
  /**
   *
   * @type {{ [key: string]: AddressMapInfo; }}
   * @memberof ParsedTransaction
   */
  addressMap: {
    [key: string]: AddressMapInfo;
  };
  /**
   *
   * @type {TokenTransfer[]}
   * @memberof ParsedTransaction
   */
  tokenTransfers: TokenTransfer[];
  /**
   *
   * @type {BalanceDelta[]}
   * @memberof ParsedTransaction
   */
  balance_deltas: BalanceDelta[];
  /**
   *
   * @type {{ [key: string]: TokenInfo; }}
   * @memberof ParsedTransaction
   */
  tokens: {
    [key: string]: TokenInfo;
  };
  /**
   *
   * @type {FullOuterTransaction}
   * @memberof ParsedTransaction
   */
  txData?: FullOuterTransaction;
};
