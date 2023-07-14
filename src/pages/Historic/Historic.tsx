import './Historic.scss';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import HistoricGame from '../../components/HistoricGame/HistoricGame';

function HistoricPage() {
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);

  return (
    <div className="HistoricPage_MainContainer">
      {historicGames.games.map((historicGame: GameState) => (
        <HistoricGame game={historicGame} key={historicGame.id} />
      ))}
    </div>
  );
}

export default HistoricPage;
