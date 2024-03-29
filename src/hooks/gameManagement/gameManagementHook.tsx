import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectUserName } from '../../state/user/user.selectors';
import {
  getFinishedGame, getNamedGame, getResizedGame, getRestartedGame,
} from '../../utils/factories/gameFactory/gameFactory';
import { auth } from '../../utils/firebase.util';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { useHistoricGames } from '../historicGames/historicGamesHook';
import { useAppSelector } from '../state/appStateHook';
import { useUser } from '../user/userHook';

export function useGameManagement() {
  const userName = useAppSelector<string>(selectUserName);
  const gameSettings = useAppSelector<GameState>(selectGame);
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);
  const {
    updateGame, setGame, loading: gameLoading, error: gameError,
  } = useCurrentGame();
  const { updateUserCurrentGame } = useUser();
  const { updateHistoric } = useHistoricGames();

  const startNewGame = async () => {
    const game: GameState = getRestartedGame(gameSettings);

    if (auth.currentUser) {
      const newGame = await setGame(game);
      await updateUserCurrentGame(newGame.id as string);
    } else {
      await updateGame(gameSettings.id, game);
    }
  };

  const restartGame = async () => {
    const newGame: GameState = getRestartedGame(gameSettings);
    await updateGame(gameSettings.id, newGame);
  };

  const saveAndRestartGame = async (gameName?: string) => {
    let newGame: GameState = getFinishedGame(gameSettings);
    newGame = getNamedGame(newGame, gameName);

    await updateGame(gameSettings.id, newGame);
    await saveGameIntoHistoric(newGame);
    await startNewGame();
  };

  const resizeGame = async (initialLifes: number, numberOfPlayers: number) => {
    const newGame: GameState = getResizedGame(
      gameSettings,
      initialLifes,
      numberOfPlayers,
      userName,
    );

    await updateGame(gameSettings.id, newGame);
  };

  const saveGameIntoHistoric = async (game: GameState) => {
    const newHistoric: HistoricGamesState = { ...historicGames };
    newHistoric.games.push(getFinishedGame(game));

    await updateHistoric(historicGames.id, newHistoric);
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
