import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { useUser } from './userHook';
import * as appStatehooks from '../state/appStateHook';
import * as firebaseAuthServiceMock from '../../services/firebaseAuth/firebaseAuth.service.mock';
import * as GameServiceMock from '../../services/firebaseStore/game/game.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { useUserSettingsMock } from '../userSettings/userSettingsHook.mock';
import * as useUserSettings from '../userSettings/userSettingsHook';

describe('<useUser />', () => {
  let useUserStore: any;
  let wrapper: any;
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useUserStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useUserStore}>{children}</Provider>;
    };

    jest.spyOn(appStatehooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    jest.spyOn(useUserSettings, 'useUserSettings')
      .mockImplementation(useUserSettingsMock);
      
    jest.spyOn(useUserSettings, 'useUserSettings')
      .mockImplementation(useUserSettingsMock);

    firebaseAuthServiceMock.initializeMock();
    GameServiceMock.initializeMock();
  });

  afterAll(() => {
    firebaseAuthServiceMock.reset();
    GameServiceMock.reset();
  });

  it('should create', () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('login should request firebaseLogin', async () => {
    expect(firebaseAuthServiceMock.firebaseLoginSpy).not.toHaveBeenCalled();
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.login({ username: 'a@b.com', password: '' });
    });

    expect(firebaseAuthServiceMock.firebaseLoginSpy).toHaveBeenCalled();
  });

  it('login failure should set error flag true value', async () => {
    const error = { errorDesc: 'test_errorDEsc' };
    firebaseAuthServiceMock.firebaseLoginSpy.mockRejectedValue(error);

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.login({ username: 'a@b.com', password: '' }).catch((e) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toEqual(error);
      });
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });

  it('logout should request firebaseLogout setvice function', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(firebaseAuthServiceMock.firebaseLogoutSpy).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.logout();
    });
    expect(firebaseAuthServiceMock.firebaseLogoutSpy).toHaveBeenCalled();
  });

  it('signUp should request firebaseSignUp service function', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    const userName = 'test_username';
    const userPass = 'test_userpass';

    expect(firebaseAuthServiceMock.firebaseSignUpSpy).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.signUp({ username: userName, password: userPass });
    });

    expect(firebaseAuthServiceMock.firebaseSignUpSpy).toHaveBeenCalledWith(userName, userPass);
  });

  it('signUp should request setUserSettings hook function', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(firebaseAuthServiceMock.firebaseSignUpSpy).not.toHaveBeenCalled();
    const userSettings = { lang: Language.French, darkMode: true } as FirebaseUserSettingsDto;

    await act(async () => {
      await useUserStore.dispatch(setUserSettingsAction(userSettings));
    });

    await act(async () => {
      await result.current.signUp({ username: '', password: '' });
    });

    expect(useUserSettingsMock().setUserSettings).toHaveBeenCalledWith(userSettings);
  });
});
