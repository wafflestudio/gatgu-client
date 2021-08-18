import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { GText } from '@/components/Gatgu';
import { getTs } from '@/helpers/functions/time';

interface ITimerProps {
  endTs?: number;
  isStop?: boolean;
  onTimeEnd: () => void;
}

const TokenTimer: React.FC<ITimerProps> = ({ endTs, isStop, onTimeEnd }) => {
  const intervalIdRef = React.useRef<number>();

  const [remainTime, setRemainTime] = useState<number>();

  React.useEffect(() => {
    if (!endTs) return;

    clearInterval(intervalIdRef.current);
    setRemainTime(endTs - getTs());

    intervalIdRef.current = setInterval(() => {
      if (isStop) {
        clearInterval(intervalIdRef.current);
        return;
      }

      setRemainTime((prev) => {
        const next = prev ? prev - 1000 : prev;

        if (typeof next === 'number' && next <= 0) {
          clearInterval(intervalIdRef.current);
          onTimeEnd();

          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [endTs, isStop, onTimeEnd]);

  if (remainTime === undefined) {
    return null;
  }

  return (
    <GText color={isStop ? 'blue' : 'warnRed'}>
      {DateTime.fromMillis(remainTime).toFormat('mm:ss')}
    </GText>
  );
};

export default TokenTimer;
