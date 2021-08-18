import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { GText } from '@/components/Gatgu';
import { getTs } from '@/helpers/functions/time';

interface ITimerProps {
  endTs?: number;
  onTimeEnd: () => void;
}

const TokenTimer: React.FC<ITimerProps> = ({ endTs, onTimeEnd }) => {
  const intervalIdRef = React.useRef<number>();

  const [remainTime, setRemainTime] = useState<number>();

  React.useEffect(() => {
    if (!endTs) return;

    clearInterval(intervalIdRef.current);
    setRemainTime(endTs - getTs());

    intervalIdRef.current = setInterval(() => {
      setRemainTime((prev) => {
        const next = prev ? prev - 1000 : prev;

        if (next && next <= 0) {
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
  }, [endTs, onTimeEnd]);

  if (remainTime === undefined) {
    return null;
  }

  return (
    <GText color="warnRed">
      {DateTime.fromMillis(remainTime).toFormat('mm:ss')}
    </GText>
  );
};

export default TokenTimer;
