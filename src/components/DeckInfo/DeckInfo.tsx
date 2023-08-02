import './DeckInfo.scss';
import { FirebaseDeckDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';

function DeckInfo({ deck } : {deck: FirebaseDeckDto}) {
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
    </div>
  );
}

export default DeckInfo;
