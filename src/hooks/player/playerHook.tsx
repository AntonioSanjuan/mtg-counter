import {
  FirebaseCounterDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../models/internal/models/playerDetails.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { selectUserName } from '../../state/user/user.selectors';
import { auth } from '../../utils/firebase.util';
import {
  mapPlayerColor, mapPlayerCounter, mapPlayerDetails, mapPlayerOwner, mapPlayerUserId, mapPlayerWinner,
} from '../../utils/mappers/playersMappers/playersMappers';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { useAppSelector } from '../state/appStateHook';

export function usePlayer(player: FirebasePlayerDto) {
  const { updateGame } = useCurrentGame();
  const game = useAppSelector<GameState>(selectGame);
  const userName = useAppSelector<string>(selectUserName);

  const opponents = game.board.players.filter((boardPlayers) => boardPlayers.id !== player.id);

  const updatePlayerColor = async (newPlayerColor: PlayerColors) => {
    const newPlayers = mapPlayerColor(
      game.board.players,
      player.id,
      newPlayerColor,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerWinner = async () => {
    const newPlayers = mapPlayerWinner(
      game.board.players,
      player.id,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerOwner = async () => {
    let newPlayers = mapPlayerOwner(
      game.board.players,
      player.id,
    );

    if (auth.currentUser) {
      newPlayers = mapPlayerUserId(
        newPlayers,
        player.id,
        userName,
      );
    }
    await updatePlayers(newPlayers);
  };

  const updatePlayerDetails = async (newPlayerDetails: PlayerDetailsModel) => {
    const newPlayers = mapPlayerDetails(
      game.board.players,
      player.id,
      newPlayerDetails,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerCounter = async (currentCounter: FirebaseCounterDto, counterValueModification: number) => {
    const newPlayers = mapPlayerCounter(
      game.board.players,
      player.id,
      currentCounter,
      counterValueModification,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayers = async (newPlayers: FirebasePlayerDto[]) => {
    const newGame: GameState = {
      ...game,
      board: {
        ...game.board,
        players: newPlayers,
      },
    };
    await updateGame(game.id, newGame);
  };
  return {
    updatePlayerCounter,
    updatePlayerOwner,
    updatePlayerWinner,
    updatePlayerColor,
    updatePlayerDetails,
    playerOpponents: opponents,
  };
}
