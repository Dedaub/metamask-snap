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
};

export const TxRevertedPanel = (errorMsg: string): OnTransactionResponse => ({
  content: {
    type: NodeType.Panel,
    children: [
      {
        type: NodeType.Heading,
        value: '⛔ Tx Reverted/Threw',
      },
      {
        value: errorMsg,
        type: NodeType.Text,
      },
    ],
  },
  severity: 'critical',
});

const MAX_URL_CHARS_LENGTH = 2048;

export const TxConfidenceVerdict = (
  verdictMsg: string | undefined,
): Component[] =>
  verdictMsg
    ? [
        {
          type: NodeType.Heading,
          value: verdictMsg,
        },
        {
          type: NodeType.Divider,
        },
      ]
    : [];

export const TxInsights = (insights: any[]): Component[] =>
  insights?.length > 0
    ? [
        {
          type: NodeType.Divider,
        },
        ...insights.map((insight: Component) => insight),
      ]
    : [];

export const SimulateLinkToContractLibrary = (url: string): Component[] =>
  url.length < MAX_URL_CHARS_LENGTH - 13 // 13 is the length of the utm param added to the final url
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
