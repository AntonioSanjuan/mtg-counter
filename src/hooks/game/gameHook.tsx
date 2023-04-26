import React, { useState } from 'react';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { getDefaultPlayerCounters } from '../../utils/factories/playerFactory/playerFactory';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
import { useAppSelector } from '../state/appStateHook';

export function useGame() {
  const gameSettings = useAppSelector<GameState>(selectGame);
  const { updateGameSettings, loading: gameSettingsLoading, error: gameSettingsError } = useGameSettings();

  const restartGame = async () => {
    if (gameSettings.board) {
      const newGameSettings: FirebaseGameDto = {
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
      await updateGameSettings(gameSettings.id, newGameSettings);
    }
  };

  const resizeGame = async (initialLifes: number, numberOfPlayers: number) => {
    if (gameSettings.board) {
      const newGameSettings: FirebaseGameDto = getNewGame(
        initialLifes,
        numberOfPlayers,
      );

      await updateGameSettings(gameSettings.id, newGameSettings);
    }
  };

  const saveGameIntoHistoric = async () => {
    // to-do
  };

  return {
    restartGame,
    resizeGame,
    saveGameIntoHistoric,
    loading: gameSettingsLoading,
    error: gameSettingsError,
  };
}
