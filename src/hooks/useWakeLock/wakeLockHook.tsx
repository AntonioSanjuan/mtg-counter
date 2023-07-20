import { useState, useEffect } from 'react';
import { useAlert } from '../alert/alertHook';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import { NotificationAlertPropsModel } from '../../models/internal/models/alertProps.model';

export function useWakeLock() {
  const { openAlert } = useAlert();
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

  const lockScreen = () => {
    setError(false);

    if (isAvailable) {
      setLoading(true);
      navigator.wakeLock.request('screen').then((wakeLockAux: WakeLockSentinel) => {
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
  };

  const releaseLockScreen = () => {
    setError(false);

    if (isAvailable && wakeLock) {
      setLoading(true);

      wakeLock?.release().then(() => {
        setWakelock(null);
      }).catch((error) => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
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
