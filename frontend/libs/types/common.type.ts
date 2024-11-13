import * as CLSX from 'clsx';

export type ClassValue = CLSX.ClassValue;

export interface PageParams {
  params?: string | string[];
  searchParams?: SearchParams;
}

export interface SearchParams {
  [key: string]: string | string[];
}
