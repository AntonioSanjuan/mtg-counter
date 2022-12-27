import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as alertHooks from '../../../hooks/alert/alertHook';
import { useAlertMock } from '../../../hooks/alert/alertHook.mock';
import Modal from './modal';

describe('Modal', () => {
  let modalStore: any;
  let history: any;

  beforeEach(() => {
    modalStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(useAlertMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={modalStore}>
        <Router location={history.location} navigator={history}>
          <Modal>
            <p>test</p>
          </Modal>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  // it('Modal `closeButton` should trigger useAlert() closeAlert functionality', async () => {
  //   render(
  //     <Provider store={modalStore}>
  //       <Router location={history.location} navigator={history}>
  //         <Modal
  //           canBeClosed
  //         >
  //           <p>test</p>
  //         </Modal>
  //       </Router>
  //     </Provider>,
  //   );

  //   expect(useAlertMock().closeAlert).not.toHaveBeenCalled();

  //   fireEvent.click(
  //     screen.getAllByRole('button')[0],
  //   );

  //   expect(useAlertMock().closeAlert).toHaveBeenCalled();
  // });
});
