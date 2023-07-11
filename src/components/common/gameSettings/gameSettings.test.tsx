import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { act } from '@testing-library/react-hooks';
import GameSettings from './gameSettings';
import * as mock_useAlert from '../../../hooks/alert/alertHook.mock';
import * as useAlert from '../../../hooks/alert/alertHook';
import * as mock_useGameManagement from '../../../hooks/gameManagement/gameManagementHook.mock';
import * as useGameManagement from '../../../hooks/gameManagement/gameManagementHook';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { mockFirebaseAuthUser } from '../../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { DynamicAlertTypes } from '../../../models/internal/types/DynamicAlertEnum.model';

describe('GameSettings', () => {
  let gameSettingsStore: any;
  let history: any;

  beforeEach(() => {
    gameSettingsStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(useAlert, 'useAlert')
        .mockImplementation(mock_useAlert.mock);
    jest.spyOn(useGameManagement, 'useGameManagement')
        .mockImplementation(mock_useGameManagement.mock);

    mock_useAlert.initializeMock()
    mock_useGameManagement.initializeMock()
  });

  afterEach(() => {
    mockFirebaseAuthUser(undefined)
  })

  it('should create', () => {
    const { container } = render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('change InitialLifes should request to updateGameSettings', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(mock_useGameManagement.mock().resizeGame).not.toHaveBeenCalled()

    const languageSelect = screen.getByLabelText('InitialLifes');
   
    
    await act(async () => {
        fireEvent.change(languageSelect, { target: { value: Lifes.Twenty } })
    });

    expect(mock_useGameManagement.mock().resizeGame).toHaveBeenCalled()
  });

  it('change NumberOfPlayers should request to updateGameSettings', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(mock_useGameManagement.mock().resizeGame).not.toHaveBeenCalled()

    const numberOFPlayersSelect = screen.getByLabelText('NumberOfPlayers');
   
    
    await act(async () => {
        fireEvent.change(numberOFPlayersSelect, { target: { value: NumberOfPlayers.Six } })
    });

    expect(mock_useGameManagement.mock().resizeGame).toHaveBeenCalled()
  });



  it('Restart show openAlert if user is logged', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );
    mockFirebaseAuthUser({} as User)

    const button = screen.getByRole('button', { name: 'restartGameSettings' });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mock_useAlert.mock().openAlert).toBeCalled()

    //to-do OK buton callbacks
    //to-do  CANCEL button callbacks
  });

  it('Restart show openAlert if user is not logged', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'restartGameSettings' });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mock_useGameManagement.mock().restartGame).toHaveBeenCalled()
  });

});
