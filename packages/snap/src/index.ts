import { OnTransactionHandler } from '@metamask/snaps-types';
import { NodeType, Component } from '@metamask/snaps-ui';
import { simulateTransaction } from './api';
import { calcTokenAmounts, mapTokenToData } from './helpers';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId: _chainId,
  transactionOrigin: _transactionOrigin,
}) => {
  try {
    const response = await simulateTransaction(transaction);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    const txReverted = payload.trace_node.children[0]?.opcode === 'REVERT';

    if (txReverted) {
      return {
        content: {
          type: NodeType.Panel,
          children: [
            {
              type: NodeType.Heading,
              value: '⛔ Tx Reverted',
            },
            {
              type: NodeType.Text,
              value: 'Find the error message from logs',
            },
          ],
        },
        severity: 'critical',
      };
    }

    const assetsOut = payload.token_transfers
      .filter(
        (tokenTransfer: any) =>
          tokenTransfer.from_a.toLowerCase() === transaction.from,
      )
      .map((tokenTransfer: any) => {
        const tokenData = mapTokenToData(tokenTransfer.address, payload.tokens);
        return {
          ...tokenTransfer,
          ...tokenData,
          ...calcTokenAmounts(
            tokenTransfer.amount,
            tokenData.decimals,
            tokenData.lastPrice,
          ),
        };
      });

    const assetsIn = payload.token_transfers
      .filter(
        (tokenTransfer: any) =>
          tokenTransfer.to_a.toLowerCase() === transaction.from,
      )
      .map((tokenTransfer: any) => {
        const tokenData = mapTokenToData(tokenTransfer.address, payload.tokens);
        return {
          ...tokenTransfer,
          ...tokenData,
          ...calcTokenAmounts(
            tokenTransfer.amount,
            tokenData.decimals,
            tokenData.lastPrice,
          ),
        };
      });

    const drawAssetsOut: Component[] =
      assetsOut.length > 0
        ? assetsOut
            .map((asset: any) => [
              {
                value: `**Symbol: ${asset.symbol}**`,
                type: NodeType.Text,
                markdown: true,
              },
              {
                value: `Name: ${asset.name}`,
                type: NodeType.Text,
              },
              {
                value: `Transfer: - ${asset.amount} (≈ $${asset.value})`,
                type: NodeType.Text,
              },
            ])
            .reduce(
              (acc: Component[], value: Component[]) => [...acc, ...value],
              [],
            )
        : {
            value: 'No inbound assets',
            type: NodeType.Text,
          };

    const drawAssetsIn: Component[] = assetsIn
      .map((asset: any) => [
        {
          value: `**Symbol: ${asset.symbol}**`,
          type: NodeType.Text,
          markdown: true,
        },
        {
          value: `Name: ${asset.name}`,
          type: NodeType.Text,
        },
        {
          value: `Transfer: + ${asset.amount} (≈ $${asset.value})`,
          type: NodeType.Text,
        },
      ])
      .reduce((acc: Component[], value: Component[]) => [...acc, ...value], []);

    return {
      content: {
        type: NodeType.Panel,
        children: [
          {
            type: NodeType.Heading,
            value: '⚖️ Asset Balances:',
          },
          {
            value: '**⚠️ Assets out**',
            type: NodeType.Text,
            markdown: true,
          },
          ...drawAssetsOut,
          {
            type: NodeType.Divider,
          },
          {
            value: '**✅ Assets in**',
            type: NodeType.Text,
            markdown: true,
          },
          ...drawAssetsIn,
        ],
      },
      severity: 'critical',
    };
  } catch (error) {
    console.log('ERROR tx simulate', error);
    return {
      content: {
        type: NodeType.Panel,
        children: [
          {
            type: NodeType.Heading,
            value: '⚠️ TX Error',
          },
          {
            type: NodeType.Text,
            value: error.toString(),
          },
        ],
      },
      severity: 'critical',
    };
  }
};
