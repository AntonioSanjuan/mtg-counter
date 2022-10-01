import { renderHook } from '@testing-library/react-hooks';
import { useAnimationByStateTransition } from './animationHook';

describe('<useAnimationByStateTransition />', () => {
  beforeEach(() => {

  });

  it('should create', () => {
    const input = undefined;
    const { result } = renderHook(() => useAnimationByStateTransition(input));

    expect(result.current).toBeDefined();
  });

  it('initially stateTransition should be true with input true', () => {
    const input = true;
    const { result } = renderHook(() => useAnimationByStateTransition(input));

    expect(result.current.stateTransition).toBe(true);
  });

  it('initially stateTransition should be false with input false', () => {
    const input = false;
    const { result } = renderHook(() => useAnimationByStateTransition(input));

    expect(result.current.stateTransition).toBe(false);
  });
});
