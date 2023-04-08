import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { useUser } from './userHook';
import * as appStatehooks from '../state/appStateHook';
import * as firebaseAuthServiceMock from '../../services/firebaseAuth/firebaseAuth.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { useUserSettingsMock } from '../userSettings/userSettingsHook.mock';
import * as useUserSettings from '../userSettings/userSettingsHook';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
// import * as useGameSettings from '../gameSettings/gameSettingsHook';
// import { useGameSettingsMock as mock } from '../gameSettings/gameSettingsHook.mock';

const mockSetGameSettings = jest.fn()

jest.mock('./../gameSettings/gameSettingsHook', () => ({
  useGameSettings: () => {
    return {
      setGameSettings: mockSetGameSettings.mockResolvedValue({ 
        id: 'testGameSettingsId',
        data: () => {} 
      }),
      loading: false,
      error: false,
    }
  }
}));


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

    firebaseAuthServiceMock.initializeMock();
  });

  afterAll(() => {
    firebaseAuthServiceMock.reset();
  });


  it('signUp should request setGameSettings hook function with default value', async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(firebaseAuthServiceMock.firebaseSignUpSpy).not.toHaveBeenCalled();

    expect(mockSetGameSettings).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.signUp({ username: '', password: '' });
    });

    expect(mockSetGameSettings).toHaveBeenCalled();
  });
});
