import { formatDistanceToNow } from 'date-fns';

export function timeAgo(timestamp: number) {
  const currentDate = new Date();
  const blockDate = new Date(timestamp * 1000);
  return formatDistanceToNow(blockDate, { addSuffix: true });
}

export function formatNumberWithCommas(num: bigint): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
