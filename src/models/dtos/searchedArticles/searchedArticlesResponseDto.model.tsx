import { SearchedCommonDto } from '../common/SearchCommonDto.model';

export type SearchedrticlesResponseDto = SearchedCommonDto<
  SearchedArticlesResponseContentDto[]
>;

export interface SearchedArticlesResponseContentDto {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: Date;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  slideshow_credits: string;
  subsection_name: string;
}

export interface Legacy {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
  thumbnail: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide: string;
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption?: string;
  credit?: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}

export interface Headline {
  main: string;
  kicker: string;
  content_kicker?: string;
  print_headline?: string;
  name?: string;
  seo?: string;
  sub?: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier?: string;
  title?: string;
  role: string;
  organization: string;
  rank: number;
}

export interface Byline {
  original: string;
  person: Person[];
  organization?: string;
}
