import './Historic.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import HistoricGame from '../../components/HistoricGame/HistoricGame';

function HistoricPage() {
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);
  const { t } = useTranslation();

  return (
    <div className="HistoricPage_MainContainer">
      {historicGames.games.length === 0 && (
        <p>{t('views.historic.noHistoricGames')}</p>
      )}
      {historicGames.games.map((historicGame: GameState) => (
        <HistoricGame game={historicGame} key={historicGame.id} />
      ))}
    </div>
  );
}

export default HistoricPage;
