import './Historic.scss';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';

function HistoricPage() {
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);

  return (
    <div className="HistoricPage_MainContainer">
      {historicGames.games.map((historicGame) => (
        historicGame
      ))}
    </div>
  );
}

export default HistoricPage;
