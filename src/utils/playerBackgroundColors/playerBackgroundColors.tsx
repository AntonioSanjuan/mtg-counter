import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

const backgroundColors: Record<PlayerColors, string> = {
  [PlayerColors.red]: 'var(--PlayerBackgroundColorRed)',
  [PlayerColors.blue]: 'var(--PlayerBackgroundColorBlue)',
  [PlayerColors.white]: 'var(--PlayerBackgroundColorWhite)',
  [PlayerColors.default]: 'var(--PlayerBackgroundColorDefault)',
};

export default backgroundColors;
