import { type NextRequest } from 'next/server';
import { provider } from '@/app/utils/provider';

export async function GET(request: NextRequest) {
  const latestBlockNumber = await provider.getBlockNumber();
  const blockPromises = [];
  for (let i = 0; i < 9; i++) {
    blockPromises.push(provider.getBlock(latestBlockNumber - i));
  }
  const blockData = await Promise.all(blockPromises);

  return new Response(JSON.stringify(blockData || []));
}
