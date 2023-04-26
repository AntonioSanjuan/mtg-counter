import {
  FirebaseCounterDto,
  FirebaseGameDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../models/internal/models/playerDetails.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { mapPlayerColor, mapPlayerCounter, mapPlayerDetails } from '../../utils/mappers/playersMappers/playersMappers';
import { useGame } from '../game/gameHook';
import { useAppSelector } from '../state/appStateHook';

export function usePlayer(player: FirebasePlayerDto) {
  const { updateGame } = useGame();
  const gameSettings = useAppSelector<GameState>(selectGame);

  const updatePlayerColor = async (newPlayerColor: PlayerColors) => {
    const newPlayers = mapPlayerColor(
      gameSettings.board.players,
      player.id,
      newPlayerColor,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerDetails = async (newPlayerDetails: PlayerDetailsModel) => {
    const newPlayers = mapPlayerDetails(
      gameSettings.board.players,
      player.id,
      newPlayerDetails,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerCounter = async (currentCounter: FirebaseCounterDto, counterValueModification: number) => {
    const newPlayers = mapPlayerCounter(
      gameSettings.board.players,
      player.id,
      currentCounter,
      counterValueModification,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayers = async (newPlayers: FirebasePlayerDto[]) => {
    const newGameSettings: FirebaseGameDto = {
      finished: false,
      createdAt: gameSettings.createdAt,
      finishAt: gameSettings.finishAt,
      board: {
        ...gameSettings.board,
        players: newPlayers,
      },
    };
    await updateGame(gameSettings.id, newGameSettings);
  };
  return {
    updatePlayerCounter,
    updatePlayerColor,
    updatePlayerDetails,
  };
}
