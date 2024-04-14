'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { timeAgo } from '@/app/utils/functions';
import { provider } from '../utils/provider';

/**
 * Renders a list of blocks with their details.
 *
 * @returns JSX.Element
 */
const BlockListPage = () => {
  // State variables
  const [blocks, setBlocks] = useState<any[]>([]);
  const [newBlockNumber, setNewBlockNumber] = useState<number | null>(null);

  /**
   * Fetches the initial blocks and sets them in the state.
   * Subscribes to the 'block' event and updates the new block number in the state.
   */
  useEffect(() => {
    async function fetchBlocks() {
      const initialBlocks = await getInitialBlocks();
      setBlocks(initialBlocks || []);

      provider.on('block', (blockNumber) => {
        setNewBlockNumber(blockNumber);
        setTimeout(() => {
          setNewBlockNumber(null);
        }, 5000);
      });
    }
    fetchBlocks();
  }, []);

  /**
   * Updates the blocks when a new block number is received.
   */
  useEffect(() => {
    async function updateBlocks() {
      if (newBlockNumber !== null) {
        const newBlock = await provider.getBlock(newBlockNumber);
        if (newBlock === null) return;
        setBlocks((prevBlocks) => [newBlock, ...prevBlocks]);
      }
    }
    updateBlocks();
  }, [newBlockNumber]);

  /**
   * Fetches the initial blocks from the API.
   *
   * @returns Promise<any> - The initial blocks data.
   * @throws Error - If the initial blocks fetch fails.
   */
  async function getInitialBlocks(): Promise<any> {
    const response = await fetch('http://localhost:3000/blocks/api/list');
    if (response.ok) {
      const blockData = await response.json();
      return blockData;
    } else {
      throw new Error('Failed to fetch initial blocks');
    }
  }

  /**
   * Renders the list of blocks.
   *
   * @returns JSX.Element[] - The list of block items.
   */
  return blocks.map((block, index) => (
    <div
      data-testid="block-item"
      key={index}
      className={`flex flex-col lg:flex-row ${
        newBlockNumber === block.number ? 'bg-green-500' : 'bg-white'
      } rounded-lg shadow-md p-4 mb-4`}
    >
      <div className="lg:w-1/4">
        <Link
          href={`/blocks/${block.number}`}
          className="text-xl font-semibold mb-2"
        >
          {block.number}
        </Link>
        <p className="text-gray-300 text-sm mb-2">{timeAgo(block.timestamp)}</p>
      </div>

      <div className="lg:w-1/2 lg:ml-4">
        <p className="text-gray-600 mb-2">Fee Recipient: {block.miner}</p>
        <p className="text-gray-600 mb-2">{block.transactions.length} txns</p>
      </div>
    </div>
  ));
};

export default BlockListPage;
