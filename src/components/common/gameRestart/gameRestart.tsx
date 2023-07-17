import { useState } from 'react';
import { useAlert } from '../../../hooks/alert/alertHook';
import { useGameManagement } from '../../../hooks/gameManagement/gameManagementHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { selectGameBoard } from '../../../state/game/game.selectors';
import MinifiedBoard from '../../MinifiedBoard/MinifiedBoard';
import './gameRestart.scss';

function GameRestart() {
  const { closeAlert } = useAlert();
  const board = useAppSelector<FirebaseBoardDto>(selectGameBoard);
  const [gameName, setGameName] = useState<string|undefined>(undefined);

  const {
    restartGame, saveAndRestartGame,
  } = useGameManagement();

  const save = async () => {
    await saveAndRestartGame(gameName);
    closeAlert();
  };

  const dontSave = async () => {
    await restartGame();
    closeAlert();
  };

  return (
    <div className="GameRestart_MainContainer">
      <div className="GameRestart_HeaderContainer">
        <p className="app_font_m app_font_noMargin">¿Quieres guardar la partida?</p>
      </div>
      <div className="GameRestart_Board">
        <label htmlFor="name">
          Game name
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setGameName(e.target.value)}
            value={gameName}
            className="form-control"
            placeholder="Malditos soldados"
          />
        </label>
        <p className="app_font_m app_font_noMargin">¿Quieres elegir quien ha sido el ganador?</p>

        <MinifiedBoard board={board} winnerSelection showWinner />
      </div>
      <div className="GameRestart_ActionsContainer">
        <button
          type="button"
          aria-label="GameRestart_OkButton"
          className="btn btn-primary"
          onClick={save}
        >
          OK
        </button>
        <button
          type="button"
          aria-label="GameRestart_CancelButton"
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
