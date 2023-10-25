import { Json } from '@metamask/snaps-types';

/**
 * Simulates the given transaction at the latest block number.
 *
 * @returns The results of the simulated transaction.
 */
export async function simulateTransaction(transaction: {
  [key: string]: Json;
}) {
  const { data, from, gas, to, value } = transaction;
  console.log(
    'POSTING:',
    JSON.stringify({
      data: data || '0x00',
      to_a: to,
      from_a: from,
      value,
      gas,
      block_number: 'latest',
    }),
  );

  return await fetch(
    'https://api.dedaub.com/api/transaction/ethereum/simulate',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data || '0x00',
        to_a: to,
        from_a: from,
        value,
        gas: data ? gas : '0x520C',
        block_number: 'latest',
      }),
    },
  );
}

/**
 * Fetches the ethereum gas fees.
 *
 * @returns It gets the fees.
 */
export async function getFees() {
  const response = await fetch('https://beaconcha.in/api/v1/execution/gasnow');
  return response.text();
}
