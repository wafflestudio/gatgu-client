export type TPageType = 'first' | 'next' | 'previous';

export interface ICursorPaginationResponse<T> {
  next: string;
  previous: string;
  results: T[];
}

export interface ImageDict {
  id: number;
  img_url: string;
}
