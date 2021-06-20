import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { DateTime } from 'luxon';

interface ITimerProps {
  endAt: DateTime;
  style?: any;
  onEnd?: () => void;
  options?: {
    format?: string;
    enableMinusTime?: boolean;
  };
}

const Timer: React.FC<ITimerProps> = ({
  endAt,
  style,
  onEnd = () => null,
  options = {},
}) => {
  const [isEnded, setIsEnded] = useState<boolean | null>(null);
  const [displayText, setDisplayText] = useState<string>('');
  const { format = 'yyyy-MM-dd hh:mm:ss', enableMinusTime = false } = options;

  useEffect(() => {
    const countdown = setInterval(() => {
      const currentTime = DateTime.local();
      const diff = endAt.diff(currentTime);
      if (diff.toMillis() < 0) {
        if (isEnded === false) onEnd();
        setIsEnded(true);
      }
      setDisplayText(diff.toFormat(format));
    }, 500);
    return () => clearInterval(countdown);
  }, [format]);

  if (isEnded && !enableMinusTime) return null;

  return <Text style={style}>{displayText}</Text>;
};

export default Timer;
