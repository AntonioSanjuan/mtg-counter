import { MosPopularCommonDto } from '../common/MostPopularCommonDto.model';

export type MostPopularViewedArticlesResponseDto = MosPopularCommonDto<
  MostPopularViewedArticlesResponseContentDto[]
>;

export interface MostPopularViewedArticlesResponseContentDto {
  uri: string;
  url: string;
  id: number;
  asset_id: any;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  column?: any;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  media: Medium[];
  eta_id: number;
}

export interface Medium {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  'media-metadata': MediaMetadata[];
}

export interface MediaMetadata {
  url: string;
  format: string;
  height: number;
  width: number;
}
