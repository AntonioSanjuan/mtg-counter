import './DeckInfo.scss';
import { useTranslation } from 'react-i18next';
import { FirebaseDeckDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import {
  selectHistoricGamesByDeck,
  selectHistoricGamesWinnedByDeck,
} from '../../state/historicGames/historicGames.selectors';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { GameState } from '../../state/game/models/appGame.state';

function DeckInfo({ deck } : {deck: FirebaseDeckDto}) {
  const playedGames = useAppSelector<GameState[]>(selectHistoricGamesByDeck(deck.name));
  const winnedGames = useAppSelector<GameState[]>(selectHistoricGamesWinnedByDeck(deck.name));
  const { t } = useTranslation();

  return (
    <div className="DeckInfo_MainContainer">
      <div className="DeckInfo_InfoContainer">
        <div className="DeckInfo_Info">
          <p className="app_font_l app_font_noMargin">{t('views.deckCollection.deck.info.deckName')}</p>
          <p className="app_font_m app_font_noMargin">{deck.name}</p>
        </div>
        <div className="DeckInfo_Info">
          <p className="app_font_l app_font_noMargin">{t('views.deckCollection.deck.info.commanderDeckName')}</p>
          <p className="app_font_m app_font_noMargin">{deck.commanderName}</p>
        </div>
      </div>
      <hr />
      <div className="DeckInfo_StatisticsContainer">
        <h3 className="app_font_xl">{t('views.deckCollection.deck.stadistics.title')}</h3>
        <div className="DeckInfo_Statistics">
          <div className="DeckInfo_Statistic">
            <p className="app_font_l app_font_noMargin">{t('views.deckCollection.deck.stadistics.played')}</p>
            <p className="app_font_m app_font_noMargin">{playedGames.length}</p>
          </div>
          <div className="DeckInfo_Statistic">
            <p className="app_font_l app_font_noMargin">{t('views.deckCollection.deck.stadistics.winned')}</p>
            <p className="app_font_m app_font_noMargin">{winnedGames.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckInfo;
