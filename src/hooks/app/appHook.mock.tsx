/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { Theme } from '../../models/internal/types/ThemeEnum.model';

let themeResponseMock: Theme;
let languageResponseMock: Language;
let loadingResponseMock: boolean;

export const usAppMock = () => ({
  theme: themeResponseMock,
  language: languageResponseMock,
  loading: loadingResponseMock,
});
