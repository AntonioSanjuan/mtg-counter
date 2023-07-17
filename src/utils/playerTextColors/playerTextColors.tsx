import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

export const textColors: Record<PlayerColors, string> = {
  [PlayerColors.red]: 'var(--app-hight-contrast)',
  [PlayerColors.blue]: 'var(--app-hight-contrast)',
  [PlayerColors.white]: 'var(--app-low-contrast) ',
  [PlayerColors.green]: 'var(--app-hight-contrast)',
  [PlayerColors.black]: 'var(--app-hight-contrast)',
  [PlayerColors.default]: 'var(--app-hight-contrast)',
};

export const textShadowBoxColors: Record<PlayerColors, string> = {
  [PlayerColors.red]: 'var(--app-low-contrast)',
  [PlayerColors.blue]: 'var(--app-low-contrast)',
  [PlayerColors.white]: 'var(--app-low-contrast)',
  [PlayerColors.green]: 'var(--app-low-contrast)',
  [PlayerColors.black]: 'var(--app-low-contrast)',
  [PlayerColors.default]: 'var(--app-low-contrast)',
};
