import { useState } from 'react';

export function useWakeLock() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wakeLock, setWakelock] = useState<WakeLockSentinel|null>(null);
  console.log('🚀 ~ file: wakeLockHook.tsx:7 ~ useWakeLock ~ wakeLock:', wakeLock);

  const isAvailable = 'wakeLock' in navigator;

  const lockScreen = async () => {
    setLoading(true);
    setError(false);

    if (isAvailable) {
      try {
        const wakeLockAux: WakeLockSentinel = await navigator.wakeLock.request('screen');
        setWakelock(wakeLockAux);
        setLoading(false);
      } catch (err) {
        // The wake lock request fails - usually system-related, such as low battery.
        setError(true);
      }
    }
  };

  const releaseLockScreen = async () => {
    setLoading(true);
    setError(false);

    if (isAvailable) {
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
