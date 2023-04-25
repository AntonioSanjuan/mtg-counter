import { FormikProps, useFormik } from 'formik';
import { useGameSettings } from '../../../hooks/gameSettings/gameSettingsHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto, FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { selectGame } from '../../../state/game/game.selectors';
import { GameState } from '../../../state/game/models/appGame.state';
import { getNewGame } from '../../../utils/factories/gameFactory/gameFactory';
import { getDefaultPlayerCounters } from '../../../utils/factories/playerFactory/playerFactory';
import { Loading } from '../loading/loading';
import './gameSettings.scss';

function GameSettings() {
  const gameSettings = useAppSelector<GameState>(selectGame);

  const { updateGameSettings, loading } = useGameSettings();
  const formik: FormikProps<FirebaseBoardDto> = useFormik<FirebaseBoardDto>({
    initialValues: gameSettings.board as FirebaseBoardDto,
    onSubmit: async () => {
      await updateBoard();
    },
  });

  const updateBoard = async () => {
    if (gameSettings.board) {
      const newGameSettings: FirebaseGameDto = getNewGame(
        Number(formik.values.initialLifes),
        Number(formik.values.numberOfPlayers),
      );

      await updateGameSettings(gameSettings.id, newGameSettings);
    }
  };

  const restartBoard = async () => {
    // TO-DO
    // save it? using modals

    if (gameSettings.board) {
      const newGameSettings: FirebaseGameDto = {
        createdAt: new Date(),
        finishAt: undefined,
        finished: false,
        board: {
          ...gameSettings.board,
          players: gameSettings.board.players.map((player) => ({
            ...player,
            counters: getDefaultPlayerCounters(gameSettings.board.initialLifes),
          })),
        },
      };
      await updateGameSettings(gameSettings.id, newGameSettings);
    }
  };

  return (
    <>
      { loading
            && <Loading />}
      <div className="GameSettings_MainContainer">
        <h3 className="app_font_l">
          Configure your game
        </h3>
        <form onChange={formik.handleSubmit}>
          <div className="GameSettings_Settings">
            <div className="GameSettings_Setting">
              <p className="app_font_m">Players</p>
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
            </div>
            <div className="GameSettings_Setting">
              <p className="app_font_m">Lifes</p>
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
            </div>
            <button
              type="button"
              className="btn btn-danger"
              aria-label="restartGameSettings"
              onClick={restartBoard}
            >
              Restart
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GameSettings;
