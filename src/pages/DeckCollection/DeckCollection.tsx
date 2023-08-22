import './DeckCollection.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectDeckCollection } from '../../state/deckCollection/deckCollection.selectors';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import DeckInfo from '../../components/DeckInfo/DeckInfo';

function DeckCollectionPage() {
  const deckCollection = useAppSelector<DeckCollectionState>(selectDeckCollection);
  const { openAlert } = useAlert();
  const { t } = useTranslation();

  const addNewDeck = () => {
    openAlert(DynamicAlertTypes.AddDeckToCollection);
  };

  return (
    <div className="DeckCollectionPage_MainContainer">
      <div className="DeckCollectionPage_ActionContainer">
        <button
          type="button"
          name="addNewDeck"
          aria-label="addNewDeck"
          className="btn btn-danger"
          onClick={addNewDeck}
        >
          {t('views.deckCollection.actions.addDeck')}
        </button>
      </div>
      {deckCollection.decks.length === 0 && (
        <p>{t('views.deckCollection.noDeckCollection')}</p>
      )}
      {deckCollection.decks.map((deck: FirebaseDeckDto) => (
        <DeckInfo key={deck.name} deck={deck} />
      ))}
    </div>
  );
}

export default DeckCollectionPage;
