import { useEffect, useRef, useState } from 'react';
import {
  FirebaseCounterDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { usePlayerHook } from '../player/playerHook';

export function useCounterHook(player: FirebasePlayerDto, currentCounter: FirebaseCounterDto) {
  const { updatePlayerCounter } = usePlayerHook(player);

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
