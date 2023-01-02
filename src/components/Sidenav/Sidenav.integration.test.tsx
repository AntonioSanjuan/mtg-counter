import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Sidenav } from './Sidenav';

import * as sidenavHooks from '../../hooks/sidenav/sidenavHook';
import * as userHooks from '../../hooks/user/userHook';
import * as alertHooks from '../../hooks/alert/alertHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useUserMock } from '../../hooks/user/userHook.mock';
import { useSidenavMock } from '../../hooks/sidenav/sidenavHook.mock';
import { useAlertMock } from '../../hooks/alert/alertHook.mock';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';
import { setUserAction } from '../../state/user/user.actions';
import { User } from 'firebase/auth';
import { Section } from '../common/section/section';

describe('Sidenav', () => {
  let sidenavStore: any;
  let history: any;

  beforeEach(() => {
    sidenavStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(sidenavHooks, 'useSidenavLayer')
      .mockImplementation(useSidenavMock);

    jest.spyOn(userHooks, 'useUser')
      .mockImplementation(useUserMock);

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(useAlertMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('Sidenav `newGame` secction should trigger navigation to home', () => {
    render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

    expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByText('New Game'),
    );

    expect(history.location.pathname).toEqual('/');
    expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalled();
  });

  it('Sidenav History should not appear if user is not logged', () => {
    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

    // sidenavStore.dispatch(
    //   setUserAction({} as User),
    // );
    expect(container).not.toContainHTML(render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
        <Section
            sectionName="History"
            onClickCallback={() => {} }
          >
            <i className="bi bi-bookmark-star-fill" />
          </Section>        
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('Sidenav History should appear if user is logged', () => {
    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

    sidenavStore.dispatch(
      setUserAction({} as User),
    );

    expect(container).toContainHTML(render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
        <Section
            sectionName="History"
            onClickCallback={() => {} }
          >
            <i className="bi bi-bookmark-star-fill" />
          </Section>        
        </Router>
      </Provider>,
    ).container.innerHTML)
  });
});
