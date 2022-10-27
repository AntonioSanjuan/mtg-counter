import { useEffect, useRef, useState } from 'react';
import { FirebaseCounterDto, FirebaseGameDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGame } from '../../state/game/game.selectors';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
import { useAppSelector } from '../state/appStateHook';

export function useCounterHook(player: FirebasePlayerDto, currentCounter: FirebaseCounterDto) {
  const [temporaryCount, setTemporaryCount] = useState<number>(0);
  const { updateGameSettings } = useGameSettings();
  const gameSettings = useAppSelector<FirebaseGameDto>(selectGame);
  const temporaryCountTimeout = useRef<NodeJS.Timeout>();

  const updateCounter = async () => {
    console.log('updateCounter');
    const newPlayers = gameSettings.board.players.map((boardPlayer) => {
      if (player.id === boardPlayer.id) {
        const targetPlayer = player;
        targetPlayer.counters = targetPlayer.counters.map((counter) => {
          if (counter.type === currentCounter.type) {
            const targetCounter = counter;
            targetCounter.value = currentCounter.value + temporaryCount;
            return targetCounter;
          }
          return counter;
        });
        return targetPlayer;
      }
      return boardPlayer;
    });

    const newGameSettings: FirebaseGameDto = {
      ...gameSettings,
      board: {
        ...gameSettings.board,
        players: newPlayers,
      },
    };
    await updateGameSettings(newGameSettings);
    setTemporaryCount(0);
  };

  // useEffect(() => () => {
  // }, []);

  useEffect(() => {
    if (temporaryCount) {
      if (temporaryCountTimeout.current) {
        clearTimeout(temporaryCountTimeout.current);
      }
      temporaryCountTimeout.current = setTimeout(updateCounter, 5000);
    }
  }, [temporaryCount]);

  const addCounters = () => {
    setTemporaryCount(temporaryCount + 1);
  };
  const removeCounters = () => {
    setTemporaryCount(temporaryCount - 1);
  };

  return {
    temporaryCount,
    addCounters,
    removeCounters,
  };
}
