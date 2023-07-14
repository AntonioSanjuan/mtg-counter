import { useTranslation } from 'react-i18next';
import { GameState } from '../../state/game/models/appGame.state';
import { getPlayerWidthPercentage } from '../../utils/boardPlayerRotation/boardPlayerRotation';
import HistoricPlayer from '../HistoricPlayer/HistoricPlayer';
import './HistoricGame.scss';

function HistoricGame({ game } : {game: GameState}) {
  const { t } = useTranslation();

  const { board } = game;
  return (
    <div className="HistoricGame_MainContainer">
      <div className="HistoricGame_BoardContainer">
        {
          board.players.map((player) => (
            <div
              key={player.id}
              className="HistoricGame_PlayerContainer"
              style={{
                width: '50%',
                height: `calc(${getPlayerWidthPercentage(board.numberOfPlayers)}%)`,
              }}

            >
              <HistoricPlayer player={player} />
            </div>
          ))
      }
      </div>
      <div className="HistoricGame_InfoContainer">
        <p className="app_font_l">Creada</p>
        <p className="app_font_m">
          {t(
            'common.date',
            {
              val: new Date(),
            },
          ) }

        </p>
        <p className="app_font_l">Finalizada</p>
        <p className="app_font_m">
          {t(
            'common.date',
            {
              val: game.finishAt,
            },
          ) }

        </p>
        <p className="app_font_l">Players</p>
      </div>
    </div>
  );
}

export default HistoricGame;
