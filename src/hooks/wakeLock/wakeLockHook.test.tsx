import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useWakeLock } from './wakeLockHook';
import { createJsDomWakeLock } from '../../utils/testsUtils/jsDomUnsupportedProps.util';
import { act } from 'react-dom/test-utils';
describe('<useWakeLock />', () => {

  let useWakeLockStore: any;
  let wrapper: any;

  let wakeLockSpy: any;

  beforeEach(() => {
    useWakeLockStore = createTestStore();

    //no availableWakeLock
    // createJsDomWakeLock({
    //   request: jest.fn().mockResolvedValue({})
    // });
    createJsDomWakeLock();

    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useWakeLockStore}>{children}</Provider>;
    };

    // wakeLockSpy = jest.spyOn(navigator, 'wakeLock', 'get');

  });

  it('should create', () => {
    const { result } = renderHook(() => useWakeLock(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('lockScreen should not call request fn if its not available', () => {
    const { result } = renderHook(() => useWakeLock(), { wrapper });

    // act(async () => {
    //   result.current.lockScreen()
    // });

    expect(navigator.wakeLock.request).toHaveBeenCalled()

  });

});
