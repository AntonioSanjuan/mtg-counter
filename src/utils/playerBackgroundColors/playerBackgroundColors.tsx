import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

export const backgroundColors: Record<PlayerColors, string> = {
  [PlayerColors.red]: 'var(--PlayerBackgroundColorRed)',
  [PlayerColors.blue]: 'var(--PlayerBackgroundColorBlue)',
  [PlayerColors.white]: 'var(--PlayerBackgroundColorWhite)',
  [PlayerColors.green]: 'var(--PlayerBackgroundColorGreen)',
  [PlayerColors.black]: 'var(--PlayerBackgroundColorBlack)',
  [PlayerColors.default]: 'var(--PlayerBackgroundColorDefault)',
};
