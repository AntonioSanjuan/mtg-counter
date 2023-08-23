import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../hooks/alert/alertHook';
import { useGameManagement } from '../../../hooks/gameManagement/gameManagementHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { DynamicAlertTypes } from '../../../models/internal/types/DynamicAlertEnum.model';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { selectGame } from '../../../state/game/game.selectors';
import { GameState } from '../../../state/game/models/appGame.state';
import { Loading } from '../loading/loading';
import './gameSettings.scss';
import { auth } from '../../../utils/firebase.util';

function GameSettings() {
  const gameSettings = useAppSelector<GameState>(selectGame);
  const {
    restartGame, resizeGame, loading,
  } = useGameManagement();
  const { t } = useTranslation();

  const { openAlert, closeAlert } = useAlert();
  const formik: FormikProps<FirebaseBoardDto> = useFormik<FirebaseBoardDto>({
    initialValues: gameSettings.board as FirebaseBoardDto,
    onSubmit: async () => {
      await updateBoard();
    },
  });

  const updateBoard = async () => {
    resizeGame(
      Number(formik.values.initialLifes),
      Number(formik.values.numberOfPlayers),
    );
  };

  const restartGameClb = async () => {
    if (auth.currentUser) {
      openAlert(DynamicAlertTypes.GameRestart);
    } else {
      await restartGame();
      closeAlert();
    }
  };

  return (
    <>
      { loading
            && <Loading />}
      <div className="GameSettings_MainContainer">
        <h3 className="app_font_xl">
          {t('modals.gameSettings.title')}
        </h3>
        <form onChange={formik.handleSubmit}>
          <div className="GameSettings_Settings">
            <div className="GameSettings_Setting">
              <label htmlFor="numberOfPlayers">
                <p className="app_font_m app_font_noMargin">
                  {t('modals.gameSettings.form.players.label')}
                </p>
                <select
                  className="form-select"
                  id="numberOfPlayers"
                  aria-label="NumberOfPlayers"
                  name="numberOfPlayers"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.numberOfPlayers}
                >
                  <option value={NumberOfPlayers.Two}>2</option>
                  <option value={NumberOfPlayers.Three}>3</option>
                  <option value={NumberOfPlayers.Four}>4</option>
                  <option value={NumberOfPlayers.Five}>5</option>
                  <option value={NumberOfPlayers.Six}>6</option>
                </select>
              </label>

            </div>
            <div className="GameSettings_Setting">
              <label htmlFor="initialLifes">
                <p className="app_font_m app_font_noMargin">{t('modals.gameSettings.form.lifes.label')}</p>
                <select
                  className="form-select"
                  id="initialLifes"
                  aria-label="InitialLifes"
                  name="initialLifes"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.initialLifes}
                >
                  <option value={Lifes.Twenty}>20</option>
                  <option value={Lifes.Thirty}>30</option>
                  <option value={Lifes.Fourty}>40</option>
                </select>
              </label>

            </div>
            <button
              type="button"
              name="restartGameSettings"
              aria-label="restartGameSettings"
              className="btn btn-danger"
              onClick={restartGameClb}
            >
              {t('modals.gameSettings.actions.restart')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GameSettings;
