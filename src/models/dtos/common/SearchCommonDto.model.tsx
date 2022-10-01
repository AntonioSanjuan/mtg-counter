export interface SearchedCommonDto<T> {
    status: string;
    copyright: string;
    response: SearchCommonResponseDto<T>;
  }

export interface SearchCommonResponseDto<T> {
    meta: MetaResponseDto
    docs: T
}

export interface MetaResponseDto {
    hits: number,
    offset: number,
    time: number
}
