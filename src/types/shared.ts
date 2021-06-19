export type TPageType = 'first' | 'next' | 'previous';

export interface ICursorPaginationResponse<T> {
  next: string;
  previous: string;
  results: T[];
}
