import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { act } from '@testing-library/react-hooks';
import * as mock_useAlert from '../../../hooks/alert/alertHook.mock';
import * as useAlert from '../../../hooks/alert/alertHook';
import * as mock_useGameManagement from '../../../hooks/gameManagement/gameManagementHook.mock';
import * as useGameManagement from '../../../hooks/gameManagement/gameManagementHook';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { mockFirebaseAuthUser } from '../../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { DynamicAlertTypes } from '../../../models/internal/types/DynamicAlertEnum.model';
import GameSave from './gameSave';

describe('GameSave', () => {
  let gameSaveStore: any;
  let history: any;

  beforeEach(() => {
    gameSaveStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(useAlert, 'useAlert')
        .mockImplementation(mock_useAlert.mock);
    jest.spyOn(useGameManagement, 'useGameManagement')
        .mockImplementation(mock_useGameManagement.mock);

    mock_useAlert.initializeMock()
    mock_useGameManagement.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={gameSaveStore}>
        <Router location={history.location} navigator={history}>
          <GameSave />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('saveButton click should open alert GameSave', async () => {
    render(
      <Provider store={gameSaveStore}>
        <Router location={history.location} navigator={history}>
          <GameSave />
        </Router>
      </Provider>,
    );

    expect(mock_useAlert.mock().closeAlert).not.toHaveBeenCalled()
    expect(mock_useGameManagement.mock().saveAndRestartGame).not.toHaveBeenCalled()

    const saveButton = screen.getByLabelText('GameSave_OkButton');
   
    
    await act(async () => {
        fireEvent.click(saveButton)
    });

    expect(mock_useAlert.mock().closeAlert).toHaveBeenCalled()
    expect(mock_useGameManagement.mock().saveAndRestartGame).toHaveBeenCalled()
  });
});
