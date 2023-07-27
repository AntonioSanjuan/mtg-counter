import { useState, useEffect } from 'react';

export function useWakeLock() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wakeLock, setWakelock] = useState<WakeLockSentinel|null>(null);

  const isAvailable: boolean = 'wakeLock' in navigator;

  useEffect(() => {
    if (wakeLock) {
      document.addEventListener('visibilitychange', () => {
        relockScreen();
      });
    }
  }, [wakeLock]);

  const relockScreen = () => {
    if (document.visibilityState === 'visible') {
      lockScreen();
    }
  };

  const lockScreen = async (): Promise<void> => {
    setError(false);

    if (isAvailable) {
      setLoading(true);
      return navigator.wakeLock.request('screen').then((wakeLockAux: WakeLockSentinel) => {
        setWakelock(wakeLockAux);
      }).catch(() => {
        // The wake lock request fails - usually system-related, such as low battery.
        setError(true);

        // reset
        setWakelock(null);
        document.removeEventListener('visibilitychange', () => {
          relockScreen();
        });
      }).finally(() => {
        setLoading(false);
      });
    }
    return Promise.resolve();
  };

  const releaseLockScreen = async (): Promise<void> => {
    setError(false);

    if (isAvailable && wakeLock) {
      setLoading(true);

      return wakeLock?.release().then(() => {
        setWakelock(null);
      }).catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
    }
    return Promise.resolve();
  };

  return {
    lockScreen,
    releaseLockScreen,
    isAvailable,
    loading,
    error,
  };
}
