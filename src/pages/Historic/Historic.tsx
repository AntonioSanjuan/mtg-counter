import './Historic.scss';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';
import Board from '../../components/Board/Board';

function HistoricPage() {
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);
  console.log('🚀 ~ file: Historic.tsx:8 ~ HistoricPage ~ historicGames:', historicGames);

  return (
    <div className="HistoricPage_MainContainer">
      {historicGames.games.map((historicGame) => (
        <Board />
      ))}
    </div>
  );
}

export default HistoricPage;
