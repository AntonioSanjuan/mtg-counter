import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileSettings from './profileSettings';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { setUserSettingsAction } from '../../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';
import * as useUserSettings from '../../../hooks/userSettings/userSettingsHook';
import * as mock_useUserSettingsMock from '../../../hooks/userSettings/userSettingsHook.mock';

describe('ProfileSettings', () => {
  let profileSettingsStore: any;
  let history: any;

  beforeEach(() => {
    profileSettingsStore = createTestStore();
    history = createMemoryHistory();
    profileSettingsStore.dispatch(
      setUserSettingsAction({ darkMode: true, lang: 'es' } as FirebaseUserSettingsDto),
    );

    jest.spyOn(useUserSettings, 'useUserSettings')
      .mockImplementation(mock_useUserSettingsMock.mock);
  
    mock_useUserSettingsMock.initializeMock();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={profileSettingsStore}>
        <Router location={history.location} navigator={history}>
          <ProfileSettings />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });

  it('ProfileSettings on submit should be triggered once one input radio is clicked', async () => {
    render(
      <Provider store={profileSettingsStore}>
        <Router location={history.location} navigator={history}>
          <ProfileSettings />
        </Router>
      </Provider>,
    );

    expect(mock_useUserSettingsMock.mock().updateUserSettings).not.toHaveBeenCalled();

    const radioButton = screen.getByLabelText('Dark Mode');
    expect(radioButton).toBeChecked();

    await act(async () => {
      fireEvent.click(radioButton);
    });

    expect(mock_useUserSettingsMock.mock().updateUserSettings).toHaveBeenCalled();
    expect(radioButton).not.toBeChecked();

  });

  it('ProfileSettings on submit should request to useUserSettings updateUserSettings', async () => {
    render(
      <Provider store={profileSettingsStore}>
        <Router location={history.location} navigator={history}>
          <ProfileSettings />
        </Router>
      </Provider>,
    );

    expect(mock_useUserSettingsMock.mock().updateUserSettings).not.toHaveBeenCalled();
    const select = screen.getByLabelText('Language');

    await act(async () => {
      fireEvent.change(select, { target: { value: 'es' } });
    });

    expect(mock_useUserSettingsMock.mock().updateUserSettings).toHaveBeenCalled();
  });
});
