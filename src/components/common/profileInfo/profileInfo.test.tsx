import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { setUserSettingsAction } from '../../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUser.model';
import * as useUser from '../../../hooks/user/userHook';
import * as mock_useUser from '../../../hooks/user/userHook.mock';
import ProfileInfo from './profileInfo'
describe('profileInfo', () => {
  let profileSettingsStore: any;
  let history: any;

  beforeEach(() => {
    profileSettingsStore = createTestStore();
    history = createMemoryHistory();
    profileSettingsStore.dispatch(
      setUserSettingsAction({ darkMode: true, lang: 'es' } as FirebaseUserSettingsDto, 'userName'),
    );

    jest.spyOn(useUser, 'useUser')
      .mockImplementation(mock_useUser.mock);
  
    mock_useUser.initializeMock();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={profileSettingsStore}>
        <Router location={history.location} navigator={history}>
          <ProfileInfo />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });

});
