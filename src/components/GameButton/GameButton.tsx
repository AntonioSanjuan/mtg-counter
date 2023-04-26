import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import './GameButton.scss';

function GameButton() {
  const { openAlert } = useAlert();

  const openGameSettings = () => {
    openAlert(DynamicAlertTypes.GameSettings);
  };

  return (
    <div className="GameButton_Maincontainer">
      <button
        type="button"
        aria-label="gameButton"
        className="btn btn-link GameButton_Button"
        onClick={() => openGameSettings()}
      >
        <i className="bi bi-box" />
      </button>
    </div>
  );
}

export default GameButton;
