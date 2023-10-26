import { OnTransactionHandler } from '@metamask/snaps-types';
import { NodeType, Component } from '@metamask/snaps-ui';
import { simulateTransaction } from './api';
import {
  calcTokenAmounts,
  getContractLibrarySimulateUrl,
  getNetworkName,
  mapTokenToData,
} from './helpers';
import {
  NetworkNotSupportedPanel,
  SimulateLinkToContractLibrary,
  TxRevertedPanel,
} from './panelMessages';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin: _transactionOrigin,
}) => {
  const networkName = getNetworkName(chainId);

  if (!networkName) {
    return NetworkNotSupportedPanel;
  }

  try {
    const response = await simulateTransaction(transaction, networkName);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    const txReverted = payload.trace_node.children[0]?.opcode === 'REVERT';

    if (txReverted) {
      return TxRevertedPanel;
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

    const DrawAssetsOut: Component[] =
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

    const DrawAssetsIn: Component[] = assetsIn
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

    const contractLibraryUrl = getContractLibrarySimulateUrl(
      transaction,
      networkName,
    );

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
          ...DrawAssetsOut,
          {
            type: NodeType.Divider,
          },
          {
            value: '**✅ Assets in**',
            type: NodeType.Text,
            markdown: true,
          },
          ...DrawAssetsIn,
          ...SimulateLinkToContractLibrary(contractLibraryUrl),
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
