import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useWakeLock } from './wakeLockHook';
import { createJsDomWakeLock } from '../../utils/testsUtils/jsDomUnsupportedProps.util';
import { act } from 'react-dom/test-utils';
describe('<useWakeLock />', () => {

  let useWakeLockStore: any;
  let wrapper: any;
  let wakeLockRequestSpy: any;
  let wakeLockReleaseSpy: any;

  beforeEach(() => {
    useWakeLockStore = createTestStore();

    createJsDomWakeLock(true);
    wakeLockRequestSpy = jest.spyOn(navigator.wakeLock, 'request');

    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useWakeLockStore}>{children}</Provider>;
    };


  });

  it('should create', () => {
    const { result } = renderHook(() => useWakeLock(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('lockScreen should call request fn if its available', async () => {
    const { result } = renderHook(() => useWakeLock(), { wrapper });

    await act(async () => {
      await result.current.lockScreen()
    });

    expect(wakeLockRequestSpy).toHaveBeenCalled()

  });

  it('lockScreen should not call request fn if its not available', async () => {
    createJsDomWakeLock(false);

    const { result } = renderHook(() => useWakeLock(), { wrapper });

    await act(async () => {
      await result.current.lockScreen()
    });

    expect(wakeLockRequestSpy).not.toHaveBeenCalled()
  });

  it('releaseLockScreen should not call release fn if its not available', async () => {
    createJsDomWakeLock(false);

    const { result } = renderHook(() => useWakeLock(), { wrapper });

    const releaseSpy = jest.fn().mockResolvedValue(undefined)
    jest.spyOn(navigator.wakeLock, 'request').mockResolvedValue(
      {
        release: releaseSpy
      } as any
    );

    await act(async () => {
      await result.current.releaseLockScreen()
    });

    expect(releaseSpy).not.toHaveBeenCalled()
  });

  it('releaseLockScreen should not call release fn if previously hasnt been called lockScreen ', async () => {
    createJsDomWakeLock(true);

    const { result } = renderHook(() => useWakeLock(), { wrapper });

    const releaseSpy = jest.fn().mockResolvedValue(undefined)
    jest.spyOn(navigator.wakeLock, 'request').mockResolvedValue(
      {
        release: releaseSpy
      } as any
    );

    await act(async () => {
      await result.current.releaseLockScreen()
    });

    expect(releaseSpy).not.toHaveBeenCalled()
  });

  it('releaseLockScreen should  call release fn if previously has been called lockScreen ', async () => {
    createJsDomWakeLock(true);

    const { result } = renderHook(() => useWakeLock(), { wrapper });

    const releaseSpy = jest.fn().mockResolvedValue(undefined)
    jest.spyOn(navigator.wakeLock, 'request').mockResolvedValue(
      {
        release: releaseSpy
      } as any
    );

    await act(async () => {
      await result.current.lockScreen();
      await result.current.releaseLockScreen()
    });

    expect(releaseSpy).toHaveBeenCalled()
  });

});
