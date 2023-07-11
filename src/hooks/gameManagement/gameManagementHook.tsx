import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { getNewGame, getRestartedGame } from '../../utils/factories/gameFactory/gameFactory';
import { getDefaultPlayerCounters } from '../../utils/factories/playerFactory/playerFactory';
import { auth } from '../../utils/firebase.util';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { useHistoricGames } from '../historicGames/historicGamesHook';
import { useAppSelector } from '../state/appStateHook';
import { useUser } from '../user/userHook';

export function useGameManagement() {
  const gameSettings = useAppSelector<GameState>(selectGame);
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);
  const {
    updateGame, setGame, loading: gameLoading, error: gameError,
  } = useCurrentGame();
  const { updateUserCurrentGame } = useUser();
  const { updateHistoric } = useHistoricGames();

  const startNewGame = async () => {
    if (gameSettings.board) {
      const game: FirebaseGameDto = {
        createdAt: new Date(),
        finishAt: undefined,
        finished: false,
        board: {
          ...gameSettings.board,
          players: gameSettings.board.players.map((player) => ({
            ...player,
            counters: getDefaultPlayerCounters(gameSettings.board.initialLifes),
          })),
        },
      };

      if (auth.currentUser) {
        const newGame = await setGame(game);

        await updateUserCurrentGame(newGame.id);
      } else {
        await updateGame(gameSettings.id, game);
      }
    }
  };

  const restartGame = async () => {
    if (gameSettings.board) {
      const newGame: FirebaseGameDto = getRestartedGame(gameSettings);
      await updateGame(gameSettings.id, newGame);
    }
  };

  const saveAndRestartGame = () => {
    saveGameIntoHistoric();
    startNewGame();
  };

  const resizeGame = async (initialLifes: number, numberOfPlayers: number) => {
    if (gameSettings.board) {
      const newGame: FirebaseGameDto = getNewGame(
        initialLifes,
        numberOfPlayers,
      );

      await updateGame(gameSettings.id, newGame);
    }
  };

  const saveGameIntoHistoric = async () => {
    if (historicGames.id) {
      updateHistoric(historicGames.id, {
        games: historicGames.games ? [...historicGames.games, gameSettings.id] : [gameSettings.id],
      } as FirebaseHistoricGamesDto);
    }
  };

  return {
    restartGame,
    saveAndRestartGame,
    startNewGame,
    resizeGame,
    loading: gameLoading,
    error: gameError,
  };
}
