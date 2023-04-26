import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as alertHooks from '../../hooks/alert/alertHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useAlert from '../../hooks/alert/alertHook.mock';
import Alert from './Alert';
import { openAlertAction } from '../../state/layout/layout.actions';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';

describe('Alert', () => {
  let alertStore: any;
  let history: any;

  beforeEach(() => {
    alertStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);

      mock_useAlert.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={alertStore}>
        <Router location={history.location} navigator={history}>
          <Alert />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('Alert should request getAlertContent if isModalOpened', async () => {
    render(
      <Provider store={alertStore}>
        <Router location={history.location} navigator={history}>
          <Alert />
        </Router>
      </Provider>,
    );

    await act(async () => {
      alertStore.dispatch(openAlertAction(DynamicAlertTypes.ProfileSettings));
    });

    
    expect(mock_useAlert.mock().getAlertContent).toHaveBeenCalled();
  });

  it('Alert should not request getAlertContent if !isModalOpened', () => {
    render(
      <Provider store={alertStore}>
        <Router location={history.location} navigator={history}>
          <Alert />
        </Router>
      </Provider>,
    );

    expect(mock_useAlert.mock().getAlertContent).not.toHaveBeenCalled();
  });
});
