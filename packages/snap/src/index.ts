import { OnTransactionHandler } from '@metamask/snaps-types';
import { NodeType, Component } from '@metamask/snaps-ui';
import { simulateTransaction } from './api';
import {
  calcTokenAmounts,
  getContractLibrarySimulateUrl,
  getNetworkName,
  hasTxReverted,
  mapTokenToData,
} from './helpers';
import {
  NetworkNotSupportedPanel,
  SimulateLinkToContractLibrary,
  TxConfidenceVerdict,
  TxInsights,
  TxRevertedPanel,
} from './panelMessages';
import { SnapSimulateResponse } from './types/SnapSimulateResponse';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin: _transactionOrigin,
}) => {
  const networkName = getNetworkName(chainId);

  if (!networkName) {
    return NetworkNotSupportedPanel;
  }

  let payload: SnapSimulateResponse;

  try {
    const response = await simulateTransaction(transaction, networkName);
    payload = await response.json();
    if (!response.ok) {
      throw new Error('An error occurred. Please try again later');
    }
  } catch (error) {
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
    };
  }

  const { simulate, verdict, insights } = payload;

  const { txReverted, txError } = hasTxReverted(simulate.trace_node);

  if (txReverted) {
    return TxRevertedPanel(txError);
  }

  const assetsOut = simulate.balance_deltas
    .filter(
      (balanceDelta) => balanceDelta.address.toLowerCase() === transaction.from,
    )
    .filter((balanceDelta: any) => balanceDelta.balance.startsWith('-0x')) // keep negative values
    .map((balanceDelta: any) => ({
      ...balanceDelta,
      balance: balanceDelta.balance.slice(1), // remove '-' prefix
    }))
    .map((balanceDelta: any) => {
      const tokenData = mapTokenToData(balanceDelta.token, simulate.tokens);
      return {
        ...balanceDelta,
        ...tokenData,
        ...calcTokenAmounts(
          balanceDelta.balance,
          tokenData.decimals,
          tokenData.lastPrice,
        ),
      };
    });

  const assetsIn = simulate.balance_deltas
    .filter(
      (balanceDelta) => balanceDelta.address.toLowerCase() === transaction.from,
    )
    .filter((balanceDelta: any) => balanceDelta.balance.startsWith('0x')) // keep positive values
    .map((balanceDelta: any) => {
      const tokenData = mapTokenToData(balanceDelta.token, simulate.tokens);
      return {
        ...balanceDelta,
        ...tokenData,
        ...calcTokenAmounts(
          balanceDelta.balance,
          tokenData.decimals,
          tokenData.lastPrice,
        ),
      };
    });

  const DrawAssetsOut: Component[] =
    assetsOut.length > 0
      ? assetsOut
          .map<Component[]>((asset) => [
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
      : [
          {
            value: 'No outbound assets',
            type: NodeType.Text,
          },
        ];

  const DrawAssetsIn: Component[] =
    assetsIn.length > 0
      ? assetsIn
          .map<Component[]>((asset: any) => [
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
          .reduce(
            (acc: Component[], value: Component[]) => [...acc, ...value],
            [],
          )
      : [
          {
            value: 'No inbound assets',
            type: NodeType.Text,
          },
        ];

  const contractLibraryUrl = getContractLibrarySimulateUrl(
    transaction,
    networkName,
  );

  return {
    content: {
      type: NodeType.Panel,
      children: [
        ...TxConfidenceVerdict(verdict),
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
        ...TxInsights(insights),
        ...SimulateLinkToContractLibrary(contractLibraryUrl),
      ],
    },
    ...(payload.severity ? { severity: payload.severity } : {}),
  };
};
