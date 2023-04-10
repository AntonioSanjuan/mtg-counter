import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { User } from 'firebase/auth';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as sidenavHooks from '../../../hooks/sidenav/sidenavHook';
import * as mock_useSidenavLayer from '../../../hooks/sidenav/sidenavHook.mock';
import { ProfileSection } from './profileSection';
import { setUserAction } from '../../../state/user/user.actions';

describe('ProfileSection', () => {
  let profileSectionStore: any;
  let history: any;

  beforeEach(() => {
    profileSectionStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(sidenavHooks, 'useSidenavLayer')
      .mockImplementation(mock_useSidenavLayer.mock);
    
    mock_useSidenavLayer.initializeMock();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={profileSectionStore}>
        <Router location={history.location} navigator={history}>
          <ProfileSection />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('ProfileSection `goToProfile` should trigger navigation to profile', async () => {
    render(
      <Provider store={profileSectionStore}>
        <Router location={history.location} navigator={history}>
          <ProfileSection />
        </Router>
      </Provider>,
    );

    await act(async () => {
      profileSectionStore.dispatch(setUserAction({} as User));
    });

    fireEvent.click(
      screen.getAllByRole('button')[0],
    );

    expect(history.location.pathname).toEqual('/Profile');
  });
});
