import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';
import './GameButton.scss';

function GameButton() {
  const { openAlert } = useAlert();

  const openGameSettings = () => {
    openAlert(DynamicModalTypes.BoardSettings);
  };

  return (
    <div className="GameButton_Maincontainer">
      <button
        type="button"
        className="btn btn-link GameButton_Button"
        onClick={() => openGameSettings()}
      >
        <i className="bi bi-box" />
      </button>
    </div>
  );
}

export default GameButton;
