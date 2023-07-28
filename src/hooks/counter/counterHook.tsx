import { useEffect, useRef, useState } from 'react';
import {
  FirebaseCounterDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGame.model';
import { usePlayer } from '../player/playerHook';

export function useCounter(player: FirebasePlayerDto, currentCounter: FirebaseCounterDto) {
  const { updatePlayerCounter, playerOpponents } = usePlayer(player);

  const [temporaryCount, setTemporaryCount] = useState<number>(0);
  const temporaryCountTimeout = useRef<NodeJS.Timeout>();

  const updateCounter = async () => {
    setTemporaryCount(0);
    await updatePlayerCounter(currentCounter, temporaryCount);
  };

  useEffect(() => {
    if (temporaryCount) {
      if (temporaryCountTimeout.current) {
        clearTimeout(temporaryCountTimeout.current);
      }
      temporaryCountTimeout.current = setTimeout(updateCounter, 2000);
    } else if (temporaryCountTimeout.current) {
      clearTimeout(temporaryCountTimeout.current);
    }
  }, [temporaryCount]);

  const getCounterOpponent = (counterOpponentId?: string) => {
    const counterOpponent: FirebasePlayerDto | undefined = counterOpponentId
      ? playerOpponents.find((playerOpponents) => playerOpponents.id === counterOpponentId)
      : undefined;
    return counterOpponent;
  };

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
    getCounterOpponent,
  };
}
