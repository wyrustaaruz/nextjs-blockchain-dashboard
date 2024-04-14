'use client';
import { useState, useEffect } from 'react';
import { Block, formatUnits } from 'ethers';
import { formatNumberWithCommas, timeAgo } from '@/app/utils/functions';

interface ParamsType {
  params: {
    blockId: string;
  };
}

/**
 * Renders the details of a specific block.
 *
 * @component
 * @param {ParamsType} params - The parameters containing the block ID.
 * @returns {JSX.Element} The block details component.
 */
export default function Home({ params }: ParamsType) {
  const { blockId } = params;
  const [blockDetail, setBlockDetail] = useState<Block>();

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await fetch(
          `http://localhost:3000/blocks/api/detail?blockId=${blockId}`
        );
        const block = await response.json();
        setBlockDetail(block);
      } catch (error) {
        console.error('Error fetching block data:', error);
      }
    }
    fetchBlocks();
  }, [blockId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">
        {blockId ? `Block ${blockId}` : 'Block'} Details
      </h1>
      <div className="gap-1">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="border px-4 py-2">{'Block Height'}</td>
              <td className="border px-4 py-2">{blockId}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Timestamp'}</td>
              <td className="border px-4 py-2">
                {blockDetail
                  ? `${timeAgo(blockDetail.timestamp)} - ${new Date(
                      blockDetail.timestamp * 1000
                    )}`
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Transactions'}</td>
              <td className="border px-4 py-2">
                {blockDetail
                  ? `${blockDetail.transactions.length}`
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Miner'}</td>
              <td className="border px-4 py-2">
                {blockDetail ? blockDetail.miner : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Gas Used'}</td>
              <td className="border px-4 py-2">
                {blockDetail
                  ? formatNumberWithCommas(blockDetail.gasUsed)
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Gas Limit'}</td>
              <td className="border px-4 py-2">
                {blockDetail
                  ? formatNumberWithCommas(blockDetail.gasLimit)
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Difficulty'}</td>
              <td className="border px-4 py-2">
                {blockDetail
                  ? formatNumberWithCommas(blockDetail.difficulty)
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Base Fee Per Gas'}</td>
              <td className="border px-4 py-2">
                {blockDetail && blockDetail.baseFeePerGas !== null
                  ? `${formatUnits(
                      BigInt(blockDetail.baseFeePerGas),
                      'gwei'
                    )} Gwei`
                  : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Hash'}</td>
              <td className="border px-4 py-2">
                {blockDetail ? blockDetail.hash : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Parent Hash'}</td>
              <td className="border px-4 py-2">
                {blockDetail ? blockDetail.parentHash : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'State Root'}</td>
              <td className="border px-4 py-2">
                {blockDetail ? blockDetail.stateRoot : 'Loading...'}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">{'Nonce'}</td>
              <td className="border px-4 py-2">
                {blockDetail ? blockDetail.nonce : 'Loading...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
