import { FirebaseBoardDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { getPlayerHeightPercentage } from '../../utils/boardPlayerRotation/boardPlayerRotation';
import MinifiedPlayer from '../MinifiedPlayer/MinifiedPlayer';
import './MinifiedBoard.scss';

function MinifiedBoard(
  { board, showWinner, winnerSelection } :
    {board: FirebaseBoardDto, showWinner?: boolean, winnerSelection?: boolean},
) {
  return (
    <div className="MinifiedBoard_MainContainer">
      <div className="MinifiedBoard_PlayersContainer">
        {
          board.players.map((player) => (
            <div
              key={player.id}
              className="MinifiedBoard_PlayerContainer"
              style={{
                width: '50%',
                height: `calc(${getPlayerHeightPercentage(board.numberOfPlayers)}%)`,
              }}

            >
              <MinifiedPlayer player={player} showWinner={!!showWinner} winnerSelection={!!winnerSelection} />
            </div>
          ))
      }
      </div>
    </div>
  );
}

export default MinifiedBoard;
