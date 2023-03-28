import { useAppSelector } from '../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGameBoard } from '../../state/game/game.selectors';
import getPlayerRotation, { getPlayerWidthPercentage } from '../../utils/boardPlayerRotation/boardPlayerRotation';
import GameButton from '../GameButton/GameButton';
import Player from '../Player/Player';
import './Board.scss';

function Board() {
  const boardSettings = useAppSelector<FirebaseBoardDto>(selectGameBoard);

  return (
    <div className="Board_MainContainer">
      <GameButton />
      {
        boardSettings.players.map((player, index) => (
          <div
            key={player.id}
            className="Board_PlayerContainer"
            style={{ height: `calc(${getPlayerWidthPercentage(boardSettings.numberOfPlayers)}%)` }}
          >
            <Player player={player} rotation={getPlayerRotation(index, boardSettings.numberOfPlayers)} />
          </div>
        ))
      }
    </div>
  );
}

export default Board;
