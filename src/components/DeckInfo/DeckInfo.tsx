import './DeckInfo.scss';
import { FirebaseDeckDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { selectHistoricGamesByDeck, selectHistoricGamesWinnedByDeck } from '../../state/historicGames/historicGames.selectors';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { GameState } from '../../state/game/models/appGame.state';

function DeckInfo({ deck } : {deck: FirebaseDeckDto}) {
  const playedGames = useAppSelector<GameState[]>(selectHistoricGamesByDeck(deck.name));
  const winnedGames = useAppSelector<GameState[]>(selectHistoricGamesWinnedByDeck(deck.name));

  return (
    <div className="DeckInfo_MainContainer">
      <div className="DeckInfo_Details">
        <p className="app_font_l app_font_noMargin">Deck Name:</p>
        <p className="app_font_m app_font_noMargin">{deck.name}</p>
      </div>
      <div className="DeckInfo_Details">
        <p className="app_font_l app_font_noMargin">Commander Name:</p>
        <p className="app_font_m app_font_noMargin">{deck.commanderName}</p>
      </div>
      <div className="DeckInfo_Statistics">
        <p className="app_font_l app_font_noMargin">Games: </p>
        <div className="DeckInfo_Details">
          <p className="app_font_l app_font_noMargin">Played: </p>
          <p className="app_font_m app_font_noMargin">{playedGames.length}</p>
        </div>
        <div className="DeckInfo_Details">
          <p className="app_font_l app_font_noMargin">Winned: </p>
          <p className="app_font_m app_font_noMargin">{winnedGames.length}</p>
        </div>
      </div>
    </div>
  );
}

export default DeckInfo;
