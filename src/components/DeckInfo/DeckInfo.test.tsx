import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import DeckInfo from './DeckInfo';
import { FirebaseDeckDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';


describe('DeckInfo', () => {
  let deckInfoStore: any;
  let history: any;
  let deckSut: FirebaseDeckDto
  beforeEach(() => {
    deckInfoStore = createTestStore();
    history = createMemoryHistory();

    deckSut = {
      name: 'deckNameTest',
      commanderName: 'commanderNameTest'
    }
  
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={deckInfoStore}>
        <Router location={history.location} navigator={history}>
          <DeckInfo deck={deckSut}/>
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });

});
