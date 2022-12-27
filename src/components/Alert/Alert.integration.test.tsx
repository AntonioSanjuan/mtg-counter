import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as alertHooks from '../../hooks/alert/alertHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useAlertMock } from '../../hooks/alert/alertHook.mock';
import Alert from './Alert';
import { openAlertAction } from '../../state/layout/layout.actions';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

describe('Alert', () => {
  let alertStore: any;
  let history: any;

  beforeEach(() => {
    alertStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(useAlertMock);
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
      alertStore.dispatch(openAlertAction(DynamicModalTypes.ProfileSettings));
    });

    
    expect(useAlertMock().getAlertContent).toHaveBeenCalled();
  });

  it('Alert should not request getAlertContent if !isModalOpened', () => {
    render(
      <Provider store={alertStore}>
        <Router location={history.location} navigator={history}>
          <Alert />
        </Router>
      </Provider>,
    );

    expect(useAlertMock().getAlertContent).not.toHaveBeenCalled();
  });
});
