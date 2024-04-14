import { type NextRequest } from 'next/server';
import { provider } from '@/app/utils/provider';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockId = searchParams.get('blockId');
  if (blockId !== null) {
    const blockData = await provider.getBlock(parseInt(blockId));
    return new Response(JSON.stringify(blockData || []));
  } else {
    return new Response('BlockId is missing in the request', { status: 400 });
  }
}
