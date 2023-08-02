import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

import DeckCollectionPage from './DeckCollection';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';
import { setDeckCollectionAction } from '../../state/deckCollection/deckCollection.actions';

describe('DeckCollection', () => {
  let deckCollectionStore: any;
  let history: any;

  let deckCollection: DeckCollectionState;
  beforeEach(() => {
    deckCollectionStore = createTestStore();
    history = createMemoryHistory();

    deckCollection = {
      id: 'deckCollectionIdTest',
      decks: [
        {
          name: 'Pium Pium',
          commanderName: 'Starn'
        }
      ]
    }

    deckCollectionStore.dispatch(
      setDeckCollectionAction(
        deckCollection),
    );
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={deckCollectionStore}>
        <Router location={history.location} navigator={history}>
          <DeckCollectionPage />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });
});
