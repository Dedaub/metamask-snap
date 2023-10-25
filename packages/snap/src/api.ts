import { Json } from '@metamask/snaps-types';

/**
 * Simulates the given transaction at the latest block number.
 *
 * @param transaction - The network object provided my metamask onTransaction trigger.
 * @param network - The network name.
 * @returns The results of the simulated transaction.
 */
export async function simulateTransaction(
  transaction: {
    [key: string]: Json;
  },
  network: string,
) {
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
    `https://api.dedaub.com/api/transaction/${network}/simulate`,
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
