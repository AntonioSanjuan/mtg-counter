import { GameState } from '../../state/game/models/appGame.state';
import { getPlayerWidthPercentage } from '../../utils/boardPlayerRotation/boardPlayerRotation';
import HistoricPlayer from '../HistoricPlayer/HistoricPlayer';
import './HistoricGame.scss';

function HistoricGame({ game } : {game: GameState}) {
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
        <p className="app_font_m">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default HistoricGame;
