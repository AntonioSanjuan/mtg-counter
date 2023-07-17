import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameState } from '../../state/game/models/appGame.state';
import './HistoricGame.scss';
import MinifiedBoard from '../MinifiedBoard/MinifiedBoard';

function HistoricGame({ game } : {game: GameState}) {
  const [ex, setEx] = useState<boolean>(false);
  const { t } = useTranslation();

  const { board } = game;

  // eslint-disable-next-line no-unsafe-optional-chaining
  const durationInHours = game.finishAt ? (game.finishAt?.getTime() - game.createdAt.getTime())
  / (60 * 60 * 1000) : '-';
  // eslint-disable-next-line no-unsafe-optional-chaining
  const durationInMin = game.finishAt ? Math.ceil((game.finishAt?.getTime() - game.createdAt.getTime())
  / (60 * 1000)) : '-';
  return (
    <div className="HistoricGame_MainContainer">
      <div className="HistoricGame_BoardContainer">
        <MinifiedBoard board={board} showWinner={ex} />
      </div>
      <div className="HistoricGame_InfoContainer">
        <div className="HistoricGame_Info">
          <div className="HistoricGame_InfoKey">
            <p className="app_font_l">Nombre de la partida</p>
          </div>
          <div className="HistoricGame_InfoValue">
            <p className="app_font_m">{game.name || '-'}</p>
          </div>
        </div>

        <div className="HistoricGame_Info">
          <div className="HistoricGame_InfoKey">
            <p className="app_font_l">Creada</p>
          </div>
          <div className="HistoricGame_InfoValue">
            <p className="app_font_m">
              {t(
                'common.date',
                {
                  val: game.createdAt,
                },
              ) }

            </p>
          </div>
        </div>

        <div className="HistoricGame_Info">
          <div className="HistoricGame_InfoKey">
            <p className="app_font_l">Finalizada</p>
          </div>
          <div className="HistoricGame_InfoValue">
            <p className="app_font_m">
              {t(
                'common.dateTime',
                {
                  val: game.finishAt,
                },
              ) }

            </p>
          </div>
        </div>

        <div className="HistoricGame_Info">
          <div className="HistoricGame_InfoKey">
            <p className="app_font_l">Duración</p>
          </div>
          <div className="HistoricGame_InfoValue">
            <p className="app_font_m">
              {durationInMin}
              {' '}
              Minuto/s

            </p>
          </div>
        </div>

      </div>
      <div className="HistoricGame_ActionContainer">
        <button
          type="button"
          aria-label="HistoricGame_ChangeBoard"
          className="btn btn-danger"
          onClick={() => setEx(!ex)}
        >
          Cambiar vista
        </button>
      </div>
    </div>
  );
}

export default HistoricGame;
