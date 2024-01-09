import { useLayoutEffect, useState } from 'react';

import { SecureStorage } from '@/plugin/crypto';
import { geDoubleDigits } from '@/utils/numberUtils';

const isMobile = /Mobi/i.test(window.navigator.userAgent);

export default function ExpirationTime() {
  const userStorage = new SecureStorage(localStorage).getItem('user-storage', 'user-storage');
  const { member_token: memberToken } = userStorage;

  const expiredMinutes = 60; // 만료 시간 (분)
  const initialMinutes = 60;
  const initialSeconds = 0;

  const [remainingMinutes, setRemainingMinutes] = useState(expiredMinutes);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  const timerCallback = () => {
    setRemainingSeconds((prev) => prev - 1);

    if (remainingSeconds === initialSeconds) {
      setRemainingSeconds(initialMinutes - 1);
      setRemainingMinutes((prev) => prev - 1);
    }
    console.log(geDoubleDigits(remainingMinutes) + ':' + geDoubleDigits(remainingSeconds));
  };

  const timerWorker: Worker = new Worker(new URL('src/utils/timerWorker.ts', import.meta.url));
  timerWorker.postMessage(1000);

  useLayoutEffect(() => {
    timerWorker.onmessage = (e) => {
      timerCallback();
      timerWorker.terminate();

      if (remainingMinutes <= initialSeconds && remainingSeconds <= initialSeconds) {
        (() => {
          localStorage.removeItem('user-storage');

          if (!isMobile) {
            location.reload();
          } else {
            location.href = '/login?firebaseToken=' + memberToken;
          }
        })();
      }
    };
  }, [remainingSeconds]);

  return (
    <div className="navbar-item">
      <div className="badge badge-default badge-sm">
        {geDoubleDigits(remainingMinutes)}:{geDoubleDigits(remainingSeconds)}
      </div>
    </div>
  );
}
