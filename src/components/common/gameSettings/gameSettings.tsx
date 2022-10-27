import { FormikProps, useFormik } from 'formik';
import { useGameSettings } from '../../../hooks/gameSettings/gameSettingsHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { FirebaseBoardDto, FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { selectGameBoard } from '../../../state/game/game.selectors';
import { getDefaultPlayers } from '../../../utils/playerFactory/playerFactory';
import { Loading } from '../loading/loading';
import './gameSettings.scss';

function BoardSettings() {
  const boardSettings = useAppSelector<FirebaseBoardDto>(selectGameBoard);

  const { updateGameSettings, loading } = useGameSettings();
  const formik: FormikProps<FirebaseBoardDto> = useFormik<FirebaseBoardDto>({
    initialValues: boardSettings as FirebaseBoardDto,
    onSubmit: async () => {
      await updateBoard();
    },
  });

  const updateBoard = async () => {
    if (boardSettings) {
      const newGameSettings: FirebaseGameDto = {
        finished: false,
        board: {
          ...boardSettings,
          initialLifes: Number(formik.values.initialLifes),
          numberOfPlayers: Number(formik.values.numberOfPlayers),
          players: getDefaultPlayers(
            Number(formik.values.initialLifes),
            Number(formik.values.numberOfPlayers),
          ),
        },
      };
      await updateGameSettings(newGameSettings);
    }
  };

  return (
    <>
      { loading
            && <Loading />}
      <div className="GameSettings_MainContainer">
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
              </select>
            </div>
            <div className="GameSettings_Setting">
              <p className="app_font_m">Lifes</p>
              <select
                className="form-select"
                id="initialLifes"
                aria-label="Language"
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
          </div>
        </form>
      </div>
    </>
  );
}

export default BoardSettings;
