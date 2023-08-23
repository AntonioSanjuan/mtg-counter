import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../hooks/alert/alertHook';
import { useGameManagement } from '../../../hooks/gameManagement/gameManagementHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { selectGameBoard } from '../../../state/game/game.selectors';
import MinifiedBoard from '../../MinifiedBoard/MinifiedBoard';
import './gameRestart.scss';
import { DynamicAlertTypes } from '../../../models/internal/types/DynamicAlertEnum.model';

function GameRestart() {
  const { closeAlert, openAlert } = useAlert();
  const { t } = useTranslation();
  const { restartGame } = useGameManagement();

  const save = async () => {
    openAlert(DynamicAlertTypes.GameSave);
  };

  const dontSave = async () => {
    await restartGame();
    closeAlert();
  };

  return (
    <div className="GameRestart_MainContainer">
      <h3 className="app_font_xl">
        {t('modals.gameRestart.title')}
      </h3>

      <div className="GameRestart_ActionsContainer">
        <button
          type="button"
          aria-label="GameRestart_OkButton"
          className="btn btn-primary"
          onClick={save}
        >
          {t('modals.gameRestart.actions.restartAndSave')}
        </button>
        <button
          type="button"
          aria-label="GameRestart_CancelButton"
          className="btn btn-danger"
          onClick={dontSave}
        >
          {t('modals.gameRestart.actions.restart')}
        </button>
      </div>
    </div>
  );
}

export default GameRestart;
