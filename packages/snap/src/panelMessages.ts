import { OnTransactionResponse } from '@metamask/snaps-types';
import { Component, NodeType } from '@metamask/snaps-ui';

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

const MAX_URL_CHARS_LENGTH = 2000;

export const SimulateLinkToContractLibrary = (url: string): Component[] =>
  url.length <= MAX_URL_CHARS_LENGTH
    ? [
        {
          type: NodeType.Divider,
        },
        {
          type: NodeType.Heading,
          value: 'Contract Library Dashboard:',
        },
        {
          value: 'View full simulation details in CL',
          type: NodeType.Text,
        },
        {
          value: url,
          type: NodeType.Copyable,
        },
      ]
    : [];
