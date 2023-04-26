import { useAlert } from '../../hooks/alert/alertHook';
import { usePlayer } from '../../hooks/player/playerHook';
import { useAppDispatch } from '../../hooks/state/appStateHook';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { openAlertAction } from '../../state/layout/layout.actions';
import ColorSelector from '../ColorSelector/ColorSelector';
import SCPlayerConfig from './PlayerConfig.style';

function PlayerConfig({ player, onPick }: {player: FirebasePlayerDto, onPick: any}) {
  const { updatePlayerColor } = usePlayer(player);
  const { openAlert } = useAlert();
  const playerColors = Object.keys(PlayerColors).filter((color) => color !== player.color);

  const handleColorChange = async (selectedColor: PlayerColors) => {
    await updatePlayerColor(selectedColor);
    onPick();
  };

  return (
    <SCPlayerConfig>
      <button
        type="button"
        aria-label="detailsButton"
        className="btn btn-link PlayerConfig_DetailsButton"
        onClick={() => {
          openAlert(DynamicAlertTypes.PlayerDetails, { player });
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
