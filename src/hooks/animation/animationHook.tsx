import { useEffect, useState } from 'react';

export function useAnimationByStateTransition(newAnimationState: boolean|undefined) {
  const [currentAnimationState, setCurrentAnimationState] = useState<boolean|undefined>(newAnimationState);

  const [stateTransition, setStateTransition] = useState<boolean>(false);

  const transitionExists = (): boolean => (
    currentAnimationState !== undefined
      && newAnimationState !== undefined
      && currentAnimationState !== newAnimationState
  );

  useEffect(() => {
    if (newAnimationState || transitionExists()) {
      setStateTransition(true);
    }
    setCurrentAnimationState(newAnimationState);
  }, [currentAnimationState, newAnimationState]);

  return { stateTransition };
}
