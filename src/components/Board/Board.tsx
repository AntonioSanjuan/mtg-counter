import { string } from 'yup/lib/locale';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { FirebaseBoardDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGameBoard } from '../../state/game/game.selectors';
import getPlayerRotation from '../../utils/boardPlayerRotation/boardPlayerRotation';
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
          <div className="Board_PlayerContainer">
            <Player player={player} rotation={getPlayerRotation(index, boardSettings.numberOfPlayers)} />
          </div>
        ))
      }
    </div>
  );
}

export default Board;
