import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import * as alertHooks from '../../hooks/alert/alertHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import GameButton from './GameButton';
import * as mock_useAlert from '../../hooks/alert/alertHook.mock';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';

describe('GameButton', () => {
  let settingButtonStore: any;
  let history: any;

  beforeEach(() => {
    settingButtonStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);

    mock_useAlert.initializeMock();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={settingButtonStore}>
        <Router location={history.location} navigator={history}>
          <GameButton />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('button click should create openAlert with DynamicModalTypes.GameSettings value', async () => {
    render(
      <Provider store={settingButtonStore}>
        <Router location={history.location} navigator={history}>
          <GameButton />
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'gameButton' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mock_useAlert.mock().openAlert).toHaveBeenCalledWith(DynamicAlertTypes.GameSettings)
  });
});
