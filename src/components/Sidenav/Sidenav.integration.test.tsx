import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Sidenav } from './Sidenav';

import * as sidenavHooks from '../../hooks/sidenav/sidenavHook';
import * as userHooks from '../../hooks/auth/authHook';
import * as alertHooks from '../../hooks/alert/alertHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useAuth from '../../hooks/auth/authHook.mock';
import * as mock_useSidenavLayer from '../../hooks/sidenav/sidenavHook.mock';
import * as mock_useAlert from '../../hooks/alert/alertHook.mock';
import { setUserAuthAction } from '../../state/user/user.actions';
import { User } from 'firebase/auth';
import { Section } from '../common/section/section';

describe('Sidenav', () => {
  let sidenavStore: any;
  let history: any;

  beforeEach(() => {
    sidenavStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(sidenavHooks, 'useSidenavLayer')
      .mockImplementation(mock_useSidenavLayer.mock);

    jest.spyOn(userHooks, 'useAuth')
      .mockImplementation(mock_useAuth.mock);

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);

      mock_useAlert.initializeMock()
      mock_useAuth.initializeMock()
      mock_useSidenavLayer.initializeMock()
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

    expect(mock_useSidenavLayer.mock().switchSidenavStatus).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByText('layouts.base.sideNav.sections.newGame'),
    );

    expect(history.location.pathname).toEqual('/');
    expect(mock_useSidenavLayer.mock().switchSidenavStatus).toHaveBeenCalled();
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
    sidenavStore.dispatch(
      setUserAuthAction({} as User),
    );

    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

 

    expect(container).toContainHTML(render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
        <Section
            sectionName="layouts.base.sideNav.sections.historic"
            onClickCallback={() => {} }
          >
            <i className="bi bi-bookmark-star-fill" />
          </Section>        
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('Sidenav DeckCollection should appear if user is logged', () => {
    sidenavStore.dispatch(
      setUserAuthAction({} as User),
    );

    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Sidenav />
        </Router>
      </Provider>,
    );

 

    expect(container).toContainHTML(render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
        <Section
            sectionName="layouts.base.sideNav.sections.deckCollection"
            onClickCallback={() => {} }
          >
                <i className="bi bi-collection" />
          </Section>        
        </Router>
      </Provider>,
    ).container.innerHTML)
  });
});
