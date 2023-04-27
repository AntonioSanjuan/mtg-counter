import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';

export function useHistoricGames() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getHistoricGames = async () => {
    // to-do
  };
  const addGameIntoHistoric = () => {
    // to-do

  };

  return {
    getHistoricGames,
    addGameIntoHistoric,
  };
}
