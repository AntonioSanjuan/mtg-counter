import { useState } from 'react';
import { useAlert } from '../alert/alertHook';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import { NotificationAlertPropsModel } from '../../models/internal/models/alertProps.model';

export function useWakeLock() {
  const { openAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wakeLock, setWakelock] = useState<WakeLockSentinel|null>(null);

  const isAvailable: boolean = 'wakeLock' in navigator;

  const relockScreen = () => {
    openAlert(DynamicAlertTypes.Notification, {
      title: 'relock',
      description: `${wakeLock?.released} - ${wakeLock?.type}`,
    } as NotificationAlertPropsModel);
    if (wakeLock && document.visibilityState === 'visible') {
      lockScreen();
    }
  };

  const lockScreen = () => {
    setError(false);

    if (isAvailable) {
      setLoading(true);
      navigator.wakeLock.request('screen').then((wakeLockAux: WakeLockSentinel) => {
        setWakelock(wakeLockAux);

        document.addEventListener('visibilitychange', async () => {
          await relockScreen();
        });
      }).catch(() => {
        // The wake lock request fails - usually system-related, such as low battery.
        setError(true);

        // reset
        setWakelock(null);
        document.removeEventListener('visibilitychange', async () => {
          await relockScreen();
        });

        // to-remove
        openAlert(DynamicAlertTypes.Notification, {
          title: 'error',
        } as NotificationAlertPropsModel);
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const releaseLockScreen = async () => {
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
