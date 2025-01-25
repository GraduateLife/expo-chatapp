import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Message } from '~/models/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSystemMessage(message: Message) {
  return message.userId === '$system';
}

export function formatTime(date: Date = new Date()): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDay(date: Date = new Date()): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();

  return `${day}, ${month} ${dateNum}`;
}

export const busy = (time: number) => {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });
  return p;
};

// Helper function to format file size
export const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
};

export type AspectRatioType = '1:1' | '16:9' | '4:3';

export const getImageAspectRatio = (
  width: number | null,
  height: number | null
): AspectRatioType => {
  if (!width || !height) return '1:1';

  const ratio = width / height;

  // Allow for small decimal differences
  if (Math.abs(ratio - 1) < 0.1) return '1:1';
  if (Math.abs(ratio - 16 / 9) < 0.1) return '16:9';
  if (Math.abs(ratio - 4 / 3) < 0.1) return '4:3';

  // Default to closest ratio
  const ratios = [
    { type: '1:1' as const, value: 1 },
    { type: '16:9' as const, value: 16 / 9 },
    { type: '4:3' as const, value: 4 / 3 },
  ];

  return ratios.reduce((prev, curr) =>
    Math.abs(curr.value - ratio) < Math.abs(prev.value - ratio) ? curr : prev
  ).type;
};
