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
  const { format = 'yyyy-MM-dd hh:mm:ss', enableMinusTime = false } = options;
  const currentTime = DateTime.local();
  const diff = currentTime.diff(endAt);

  useEffect(() => {
    if (diff.toMillis() < 0) {
      if (isEnded === false) onEnd();
      setIsEnded(true);
    }
  }, [diff]);

  if (isEnded && !enableMinusTime) return null;

  return <Text style={style}>{diff.toFormat(format)}</Text>;
};

export default Timer;
