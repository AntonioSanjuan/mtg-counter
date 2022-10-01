export interface MosPopularCommonDto<T> {
  status: string;
  copyright: string;
  num_results: number;
  results: T;
}
