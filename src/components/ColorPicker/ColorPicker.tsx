import { usePlayer } from '../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import ColorSelector from '../ColorSelector/ColorSelector';
import SCColorPicker from './ColorPicker.style';

function ColorPicker({ player }: {player: FirebasePlayerDto}) {
  const { updatePlayerColor } = usePlayer(player);
  const playerColors = Object.keys(PlayerColors).filter((color) => color !== player.color);

  const handleColorChange = async (selectedColor: PlayerColors) => {
    await updatePlayerColor(selectedColor);
  };

  return (
    <SCColorPicker>
      {playerColors.map((color) => (
        <ColorSelector
          key={color}
          color={color as PlayerColors}
          onSelect={(selectedColor: PlayerColors) => {
            handleColorChange(selectedColor);
          }}
        />

      ))}
    </SCColorPicker>
  );
}

export default ColorPicker;
