import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { useAuth } from './authHook';
import * as appStatehooks from '../state/appStateHook';
import * as mock_firebaseAuthService from '../../services/firebaseAuth/firebaseAuth.service.mock';
import * as mock_useCurrentGame from '../currentGame/currentGameHook.mock';
import * as mock_useHistoricGames from '../historicGames/historicGamesHook.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useUser from '../user/userHook.mock';
import * as useUser from '../user/userHook';
import * as useCurrentGame from '../currentGame/currentGameHook';
import * as useHistoricGames from '../historicGames/historicGamesHook';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { getAdditionalUserInfo } from 'firebase/auth';
import * as authFirebase from 'firebase/auth';

describe('<useUser />', () => {
  let useUserStore: any;
  let wrapper: any;
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useUserStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useUserStore}>{children}</Provider>;
    };

    jest.spyOn(authFirebase, 'getAdditionalUserInfo')
      .mockReturnValue({} as authFirebase.AdditionalUserInfo);

    jest.spyOn(appStatehooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    jest.spyOn(useUser, 'useUser')
      .mockImplementation(mock_useUser.mock);

    jest.spyOn(useCurrentGame, 'useCurrentGame')
      .mockImplementation(mock_useCurrentGame.mock)

    jest.spyOn(useHistoricGames, 'useHistoricGames')
      .mockImplementation(mock_useHistoricGames.mock)

    mock_firebaseAuthService.initializeMock();
    mock_useCurrentGame.initializeMock();
    mock_useHistoricGames.initializeMock();
    mock_useUser.initializeMock();
  });

  afterAll(() => {
    mock_firebaseAuthService.reset();
  });

  it('should create', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('login should request firebaseLogin', async () => {
    expect(mock_firebaseAuthService.firebaseLoginSpy).not.toHaveBeenCalled();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ username: 'a@b.com', password: '' });
    });

    expect(mock_firebaseAuthService.firebaseLoginSpy).toHaveBeenCalled();
  });

  it('login failure should set error flag true value', async () => {
    const error = { errorDesc: 'test_errorDEsc' };
    mock_firebaseAuthService.firebaseLoginSpy.mockRejectedValue(error);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ username: 'a@b.com', password: '' }).catch((e) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toEqual(error);
      });
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });

  it('loginWithGoogle with !isNewUser should request setGameSettings', async () => {
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).not.toHaveBeenCalled();
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(mock_useCurrentGame.mock().setGame).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.loginWithGoogle();
    });
    expect(mock_useCurrentGame.mock().setGame).not.toHaveBeenCalled();
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).toHaveBeenCalled();
  });

  it('loginWithGoogle with isNewUser should request setGameSettings', async () => {
    (getAdditionalUserInfo as jest.Mocked<any>).mockReturnValue({
      isNewUser: true
    })
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).not.toHaveBeenCalled();
    
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(mock_useCurrentGame.mock().setGame).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.loginWithGoogle();
    });
    expect(mock_useCurrentGame.mock().setGame).toHaveBeenCalled();
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).toHaveBeenCalled();
  });

  it('loginWithGoogle should request firebaseGoogleLogin', async () => {
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).not.toHaveBeenCalled();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.loginWithGoogle();
    });

    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).toHaveBeenCalled();
  });

  it('loginWithGoogle should request firebaseGoogleLogin', async () => {
    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).not.toHaveBeenCalled();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.loginWithGoogle();
    });

    expect(mock_firebaseAuthService.firebaseGoogleLoginSpy).toHaveBeenCalled();
  });

  it('loginWithGoogle failure should set error flag true value', async () => {
    const error = { errorDesc: 'test_errorDEsc' };
    mock_firebaseAuthService.firebaseGoogleLoginSpy.mockRejectedValue(error);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.loginWithGoogle().catch((e) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toEqual(error);
      });
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });

  it('logout should request firebaseLogout setvice function', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(mock_firebaseAuthService.firebaseLogoutSpy).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.logout();
    });
    expect(mock_firebaseAuthService.firebaseLogoutSpy).toHaveBeenCalled();
  });

  it('signUp should request firebaseSignUp service function', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const userName = 'test_username';
    const userPass = 'test_userpass';

    expect(mock_firebaseAuthService.firebaseSignUpSpy).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.signUp({ username: userName, password: userPass });
    });

    expect(mock_firebaseAuthService.firebaseSignUpSpy).toHaveBeenCalledWith(userName, userPass);
  });

  it('signUp should request setUserSettings hook function', async () => {
    const sutGameSettingsId = 'testGameSettingsId';
    const sutHistoricId = 'testHistoricGamesId';

    (getAdditionalUserInfo as jest.Mocked<any>).mockReturnValue({
      isNewUser: true
    })

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(mock_firebaseAuthService.firebaseSignUpSpy).not.toHaveBeenCalled();
    const userSettings = { lang: Language.French, darkMode: true } as FirebaseUserSettingsDto;

    await act(async () => {
      await useUserStore.dispatch(setUserSettingsAction(userSettings ));
    });

    await act(async () => {
      await result.current.signUp({ username: '', password: '' });
    });

    expect(mock_useUser.mock().setUser).toHaveBeenCalledWith(userSettings, sutGameSettingsId, sutHistoricId );
  });

  it('signUp should request setGameSettings hook function', async () => {
    
    (getAdditionalUserInfo as jest.Mocked<any>).mockReturnValue({
      isNewUser: true
    })

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(mock_firebaseAuthService.firebaseSignUpSpy).not.toHaveBeenCalled();

    expect(mock_useCurrentGame.mock().setGame).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.signUp({ username: '', password: '' });
    });

    expect(mock_useCurrentGame.mock().setGame).toHaveBeenCalled();
  });
});
