export interface PageParams {
  params?: string | string[];
  searchParams?: SearchParams;
}

export interface SearchParams {
  [key: string]: string | string[];
}
