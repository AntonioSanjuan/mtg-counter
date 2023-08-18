import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';
import SCChip from './chip.style';

function Chip({ backgroundColor, children, width }: {backgroundColor?: PlayerColors, children: any, width?: string}) {
  return (
    <SCChip width={width} backgroundColor={backgroundColor}>
      {children}
    </SCChip>
  );
}

export default Chip;
