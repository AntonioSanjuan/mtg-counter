import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { act } from '@testing-library/react-hooks';
import Notification from './notification';

describe('Notification', () => {
  let notificationStore: any;
  let history: any;

  beforeEach(() => {
    notificationStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={notificationStore}>
        <Router location={history.location} navigator={history}>
          <Notification
            title=''
            description=''
            onOkButtonClick={() => {}}
            onCancelButtonClick={() => {}}
          />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('okButton press should request onOkButtonClick', async () => {
    const okButtonCallbackSpy = jest.fn()
    const { container } = render(
      <Provider store={notificationStore}>
        <Router location={history.location} navigator={history}>
          <Notification
            title=''
            description=''
            onOkButtonClick={okButtonCallbackSpy}
            onCancelButtonClick={() => {}}
          />
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'Notification_OkButton' });
    await act(async () => {
      fireEvent.click(button);
    });  
    expect(okButtonCallbackSpy).toHaveBeenCalled()
  });

  it('okButton press should request onOkButtonClick', async () => {
    const cancelButtonCallbackSpy = jest.fn()
    const { container } = render(
      <Provider store={notificationStore}>
        <Router location={history.location} navigator={history}>
          <Notification
            title=''
            description=''
            onOkButtonClick={() => {}}
            onCancelButtonClick={cancelButtonCallbackSpy}
          />
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'Notification_CancelButton' });
    await act(async () => {
      fireEvent.click(button);
    });  
    expect(cancelButtonCallbackSpy).toHaveBeenCalled()
  });
});
