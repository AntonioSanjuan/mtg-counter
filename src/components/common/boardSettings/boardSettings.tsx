import { FormikProps, useFormik } from 'formik';
import { useBoardSettings } from '../../../hooks/boardSettings/boardSettingsHook';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { Board } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { selectGameBoard } from '../../../state/game/game.selectors';
import { Loading } from '../loading/loading';

function BoardSettings() {
  const boardSettings = useAppSelector<Board>(selectGameBoard);
  const { updateBoardSettings, loading } = useBoardSettings();
  const formik: FormikProps<Board> = useFormik<Board>({
    initialValues: boardSettings as Board,
    onSubmit: async () => {
      await updateBoard();
    },
  });

  const updateBoard = async () => {
    if (boardSettings) {
      const newBoardSettings: Board = {
        ...boardSettings,
        initialLifes: formik.values.initialLifes,
        numberOfPlayers: formik.values.numberOfPlayers,
      } as Board;
      await updateBoardSettings(newBoardSettings);
    }
  };

  return (
    <>
      { loading
            && <Loading />}
      <div className="BoardSettings_MainContainer">
        <form onChange={formik.handleSubmit}>
          <div className="BoardSettings_Settings">
            <div className="BoardSettings_Setting">
              <p className="app_font_m">Players</p>
              <select
                className="form-select"
                id="lang"
                aria-label="NumberOfPlayers"
                name="lang"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.numberOfPlayers}
              >
                <option value={NumberOfPlayers.Two}>2</option>
                <option value={NumberOfPlayers.Three}>3</option>
                <option value={NumberOfPlayers.Four}>4</option>
              </select>
            </div>
            <div className="BoardSettings_Setting">
              <p className="app_font_m">Lifes</p>
              <select
                className="form-select"
                id="lang"
                aria-label="Language"
                name="lang"
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
