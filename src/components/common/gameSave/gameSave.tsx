import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../hooks/alert/alertHook';
import { useGameManagement } from '../../../hooks/gameManagement/gameManagementHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { selectGameBoard } from '../../../state/game/game.selectors';
import MinifiedBoard from '../../MinifiedBoard/MinifiedBoard';
import './gameSave.scss';

function GameSave() {
  const { closeAlert } = useAlert();
  const board = useAppSelector<FirebaseBoardDto>(selectGameBoard);
  const [gameName, setGameName] = useState<string|undefined>(undefined);
  const { t } = useTranslation();

  const {
    saveAndRestartGame,
  } = useGameManagement();

  const save = async () => {
    await saveAndRestartGame(gameName);
    closeAlert();
  };

  return (
    <div className="GameSave_MainContainer">
      <h3 className="app_font_xl">
        {t('modals.gameSave.title')}
      </h3>
      <div className="GameSave_Board">
        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">{t('modals.gameSave.form.gameName.label')}</p>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setGameName(e.target.value)}
            value={gameName}
            className="form-control"
            placeholder={t('modals.gameSave.form.gameName.placeholder')}
          />
        </label>
        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">
            {t('modals.gameSave.wantChooseWinnerQ')}
          </p>
          <MinifiedBoard board={board} winnerSelection showWinner />

        </label>
      </div>
      <div className="GameSave_ActionsContainer">
        <button
          type="button"
          aria-label="GameSave_OkButton"
          className="btn btn-primary"
          onClick={save}
        >
          {t('modals.gameSave.actions.restartAndSave')}
        </button>
      </div>
    </div>
  );
}

export default GameSave;
