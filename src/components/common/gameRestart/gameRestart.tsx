import { useAlert } from '../../../hooks/alert/alertHook';
import { useGameManagement } from '../../../hooks/gameManagement/gameManagementHook';
import './gameRestart.scss';

function GameRestart() {
  const { closeAlert } = useAlert();

  const {
    restartGame, saveAndRestartGame,
  } = useGameManagement();

  const save = async () => {
    await saveAndRestartGame();
    closeAlert();
  };

  const dontSave = async () => {
    await restartGame();
    closeAlert();
  };

  return (
    <div className="Notification_MainContainer">
      <div className="Notification_HeaderContainer">
        <p className="app_font_m">¿Quieres guardar la partida?</p>
      </div>
      <div className="Notification_ActionsContainer">
        <button
          type="button"
          aria-label="Notification_OkButton"
          className="btn btn-primary"
          onClick={save}
        >
          OK
        </button>
        <button
          type="button"
          aria-label="Notification_CancelButton"
          className="btn btn-danger"
          onClick={dontSave}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default GameRestart;
