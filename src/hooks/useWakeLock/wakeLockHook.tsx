import { useState } from 'react';

export function useWakeLock() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wakeLock, setWakelock] = useState<WakeLockSentinel|null>(null);

  const isAvailable: boolean = 'wakeLock' in navigator;

  const lockScreen = async () => {
    setError(false);

    if (isAvailable) {
      setLoading(true);

      try {
        const wakeLockAux: WakeLockSentinel = await navigator.wakeLock.request('screen');

        wakeLockAux.addEventListener('release', () => {
          // the wake lock has been released
          console.log('mierda, mierda, mierda');
          lockScreen();
        });

        setWakelock(wakeLockAux);
        setLoading(false);
      } catch (err) {
        console.log('error', err);
        // The wake lock request fails - usually system-related, such as low battery.
        setError(true);
      }
    }
  };

  const releaseLockScreen = async () => {
    setError(false);

    if (isAvailable && wakeLock) {
      setLoading(true);

      try {
        await wakeLock?.release();
        setWakelock(null);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    }
  };

  return {
    lockScreen,
    releaseLockScreen,
    isAvailable,
    loading,
    error,
  };
}
