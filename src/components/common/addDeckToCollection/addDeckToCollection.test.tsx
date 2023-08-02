import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as alertHooks from '../../../hooks/alert/alertHook';
import * as deckCollectionHooks from '../../../hooks/deckCollection/deckCollectionHook';
import * as mock_useAlert from '../../../hooks/alert/alertHook.mock';
import * as mock_useDeckCollection from '../../../hooks/deckCollection/deckCollectionHook.mock';
import * as playerHooks from '../../../hooks/player/playerHook';
import * as mock_usePlayer from '../../../hooks/player/playerHook.mock';
import { act } from '@testing-library/react-hooks';
import AddDeckToCollection from './addDeckToCollection';
import { getDefaultPlayers } from '../../../utils/factories/playerFactory/playerFactory';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { setDeckCollectionAction } from '../../../state/deckCollection/deckCollection.actions';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

describe('addDeckToCollection', () => {
  let addDeckToCollectionStore: any;
  let history: any;

  let deckCollectionInput: DeckCollectionState = {
    id: 'deckCollectionIdTest',
    decks: [
      {
        name: 'nameTest0',
        commanderName: 'commanderNameTest0'
      }
    ]
  }
  beforeEach(() => {

    addDeckToCollectionStore = createTestStore();
    history = createMemoryHistory();

    addDeckToCollectionStore.dispatch(
      setDeckCollectionAction(deckCollectionInput),
    );

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);
    
    jest.spyOn(deckCollectionHooks, 'useDeckCollection')
      .mockImplementation(mock_useDeckCollection.mock);
    
    mock_useDeckCollection.initializeMock()
    mock_useAlert.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={addDeckToCollectionStore}>
        <Router location={history.location} navigator={history}>
          <AddDeckToCollection />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('initially submit button should be disabled', async () => {
    render(
      <Provider store={addDeckToCollectionStore}>
        <Router location={history.location} navigator={history}>
          <AddDeckToCollection />
        </Router>
      </Provider>,
    );

    const saveNewDeckButton = screen.getByRole('button', { name: 'Save new deck' });
    expect(saveNewDeckButton).toBeDisabled();

  });

  it('submit button should be disabled until form is valid', async () => {
    render(
      <Provider store={addDeckToCollectionStore}>
        <Router location={history.location} navigator={history}>
          <AddDeckToCollection />
        </Router>
      </Provider>,
    );


    const deckNameInput = screen.getByPlaceholderText<HTMLInputElement>("Vampires!");
    const commanderNameInput = screen.getByPlaceholderText<HTMLInputElement>("Markov");

    await act(async () => {
        fireEvent.change(deckNameInput, { target: { value: 'testDeckName' } });
        fireEvent.change(commanderNameInput, { target: { value: 'testCommanderName' } });   
    });

    const saveNewDeckButton = screen.getByRole('button', { name: 'Save new deck' });
    expect(saveNewDeckButton).not.toBeDisabled();

  });

  it('submit should request updateDeckCollection', async () => {
    const deckCollectionNewDeck: FirebaseDeckDto = {
      name: 'testDeckName',
      commanderName: 'testCommanderName'
    }
    render(
      <Provider store={addDeckToCollectionStore}>
        <Router location={history.location} navigator={history}>
          <AddDeckToCollection />
        </Router>
      </Provider>,
    );


    const deckNameInput = screen.getByPlaceholderText<HTMLInputElement>("Vampires!");
    const commanderNameInput = screen.getByPlaceholderText<HTMLInputElement>("Markov");

    await act(async () => {
      fireEvent.change(deckNameInput, { target: { value: 'testDeckName' } });
      fireEvent.change(commanderNameInput, { target: { value: 'testCommanderName' } });   
    });

    const saveNewDeckButton = screen.getByRole('button', { name: 'Save new deck' });
    await act(async () => {
      saveNewDeckButton.click()
    });

    const newCollectionDecks = {...deckCollectionInput}

    newCollectionDecks.decks.push(deckCollectionNewDeck)
    expect(mock_useDeckCollection.mock().updateDeckCollection).toHaveBeenCalledWith(deckCollectionInput.id, newCollectionDecks)
  });
});
