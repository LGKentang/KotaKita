import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from './types/common.type';

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(...className));
}
