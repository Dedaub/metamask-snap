import { OnTransactionResponse } from '@metamask/snaps-types';
import { NodeType } from '@metamask/snaps-ui';

export const NetworkNotSupportedPanel: OnTransactionResponse = {
  content: {
    type: NodeType.Panel,
    children: [
      {
        type: NodeType.Heading,
        value: 'Network not supported',
      },
    ],
  },
  severity: 'critical',
};

export const TxRevertedPanel: OnTransactionResponse = {
  content: {
    type: NodeType.Panel,
    children: [
      {
        type: NodeType.Heading,
        value: '⛔ Tx Reverted',
      },
    ],
  },
  severity: 'critical',
};
