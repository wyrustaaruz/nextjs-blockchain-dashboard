import BlockListPage from '@/app/components/Blocks';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
jest.setMock('node-fetch', fetchMock);

describe('BlockListPage', () => {
  it('fetches initial blocks and renders them', async () => {
    const mockBlocks = [
      {
        number: 1,
        miner: '0x123',
        transactions: ['0x123', '0x123', '0x123'],
        timestamp: Date.now(),
      },
      {
        number: 2,
        miner: '0x456',
        transactions: ['0x123', '0x123'],
        timestamp: Date.now(),
      },
    ];

    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlocks,
    });

    render(<BlockListPage />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const renderedBlocks = screen.getAllByTestId('block-item');

    expect(renderedBlocks).toHaveLength(mockBlocks.length);
  });
});
