import { useLayoutEffect, useState } from 'react';

import { useAlert } from '@/hooks/useAlert';
import { SecureStorage } from '@/plugin/crypto';
import { geDoubleDigits } from '@/utils/numberUtils';

interface WebAppInterface {
  closeApp(toast: string): never;
}
declare let android: WebAppInterface;

const isMobile = /Mobi/i.test(window.navigator.userAgent);

export default function ExpirationTime() {
  const userStorage = new SecureStorage(localStorage).getItem('user-storage', 'user-storage');
  const { member_token: memberToken } = userStorage;

  const expiredMinutes = 60; // 만료 시간 (분)
  const initialMinutes = 60;
  const initialSeconds = 0;

  const [remainingMinutes, setRemainingMinutes] = useState(expiredMinutes);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  const { alertMessage } = useAlert();

  const timerCallback = () => {
    setRemainingSeconds((prev) => prev - 1);
    if (remainingSeconds === initialSeconds) {
      setRemainingSeconds(initialMinutes - 1);
      setRemainingMinutes((prev) => prev - 1);
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(timerCallback, 1000);

    if (remainingMinutes <= initialSeconds && remainingSeconds <= initialSeconds) {
      clearTimeout(timer);
      (() => {
        localStorage.removeItem('user-storage');

        if (!isMobile) {
          location.reload();
        } else {
          //android.closeApp('앱을 다시 시작해주세요.');
          location.href = '/login?firebaseToken=' + memberToken;
        }
      })();
    }
  }, [remainingSeconds]);

  return (
    <div className="navbar-item">
      <div className="badge badge-default badge-sm">
        {geDoubleDigits(remainingMinutes)}:{geDoubleDigits(remainingSeconds)}
      </div>
    </div>
  );
}
