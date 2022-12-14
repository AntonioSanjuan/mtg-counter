import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import SCColorSelector from './ColorSelector.style';

function ColorSelector({ color, onSelect }: {color: PlayerColors, onSelect: any}) {
  return (
    <SCColorSelector
      // eslint-disable-next-line react/jsx-props-no-spreading
      color={color}
      onClick={() => { onSelect(color); }}
      disabled={disabled}
    />
  );
}

export default ColorSelector;
