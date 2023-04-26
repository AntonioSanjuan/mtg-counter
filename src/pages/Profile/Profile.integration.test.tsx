import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

import Profile from './Profile';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';

describe('Profile', () => {
  let profileStore: any;
  let history: any;

  beforeEach(() => {
    profileStore = createTestStore();
    history = createMemoryHistory();
    profileStore.dispatch(
      setUserSettingsAction({ darkMode: true, lang: 'es' } as FirebaseUserSettingsDto),
    );
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={profileStore}>
        <Router location={history.location} navigator={history}>
          <Profile />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });
});
