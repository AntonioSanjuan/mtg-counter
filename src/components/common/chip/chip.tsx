import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';
import SCChip from './chip.style';

function Chip({ backgroundColor, children }: {backgroundColor?: PlayerColors, children: any}) {
  return (
    <SCChip backgroundColor={backgroundColor}>
      {children}
    </SCChip>
  );
}

export default Chip;
