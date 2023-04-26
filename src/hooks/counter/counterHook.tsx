import { useEffect, useRef, useState } from 'react';
import {
  FirebaseCounterDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGame.model';
import { usePlayer } from '../player/playerHook';

export function useCounter(player: FirebasePlayerDto, currentCounter: FirebaseCounterDto) {
  const { updatePlayerCounter } = usePlayer(player);

  const [temporaryCount, setTemporaryCount] = useState<number>(0);
  const temporaryCountTimeout = useRef<NodeJS.Timeout>();

  const updateCounter = async () => {
    await updatePlayerCounter(currentCounter, temporaryCount);
    setTemporaryCount(0);
  };

  useEffect(() => {
    if (temporaryCount) {
      if (temporaryCountTimeout.current) {
        clearTimeout(temporaryCountTimeout.current);
      }
      temporaryCountTimeout.current = setTimeout(updateCounter, 2000);
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
