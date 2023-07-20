import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

export const textColors: Record<PlayerColors, string> = {
  [PlayerColors.red]: 'var(--PlayerBackgroundFontLight)',
  [PlayerColors.blue]: 'var(--PlayerBackgroundFontLight)',
  [PlayerColors.white]: 'var(--PlayerBackgroundFontDark) ',
  [PlayerColors.green]: 'var(--PlayerBackgroundFontLight)',
  [PlayerColors.black]: 'var(--PlayerBackgroundFontLight)',
  [PlayerColors.default]: 'var(--PlayerBackgroundFontDefault)',
};
