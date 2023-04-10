import { usePlayer } from '../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import ColorSelector from '../ColorSelector/ColorSelector';
import SCPlayerConfig from './PlayerConfig.style';

function PlayerConfig({ player, onPick }: {player: FirebasePlayerDto, onPick: any}) {
  const { updatePlayerColor } = usePlayer(player);
  const playerColors = Object.keys(PlayerColors).filter((color) => color !== player.color);

  const handleColorChange = async (selectedColor: PlayerColors) => {
    await updatePlayerColor(selectedColor);
    onPick();
  };

  return (
    <SCPlayerConfig>
      <button
        type="button"
        aria-label="infoButton"
        className="btn btn-link PlayerConfig_InfoButton"
        onClick={() => {
          console.log('ey');
        }}
      >
        <i className="bi bi-pencil-fill" />
      </button>
      {playerColors.map((color) => (
        <ColorSelector
          key={color}
          color={color as PlayerColors}
          onSelect={(selectedColor: PlayerColors) => {
            handleColorChange(selectedColor);
          }}
        />

      ))}
    </SCPlayerConfig>
  );
}

export default PlayerConfig;
