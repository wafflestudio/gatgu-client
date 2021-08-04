import { DateTime } from 'luxon';

const units = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
] as const;
const koUnits = ['년', '달', '일', '시간', '분', '초'];

export const getTs = (date?: Date | DateTime): number => {
  if (typeof date === 'undefined') {
    return DateTime.now().toMillis();
  }

  if (date instanceof Date) {
    return DateTime.fromJSDate(date).toMillis();
  }

  return date.toMillis();
};

export const getTimeDiffWithUnit = (startTs: number, endTs: number) => {
  let unitIdx = -1;
  const tsDiff = Math.abs(endTs - startTs);
  const duration = DateTime.fromMillis(tsDiff).diff(
    DateTime.fromMillis(startTs),
    'milliseconds'
  );

  while (units[++unitIdx]) {
    const timeDiff = Math.floor(duration.as(units[unitIdx]));
    if (timeDiff) {
      return `${timeDiff}${koUnits[unitIdx]}`;
    }
  }
};

export const getPassedTime = (ts: number) => {
  const currTs = getTs();

  if (ts > currTs) {
    return '';
  }

  return `${getTimeDiffWithUnit(ts, currTs)} 전`;
};

export const getRemainTime = (ts: number) => {
  const currTs = getTs();

  if (ts < currTs) {
    return '기간 만료';
  }

  return `${getTimeDiffWithUnit(currTs, ts)} 남음`;
};
// to remove!! TODO @juimdpp
export const toUnix = (date: number): number => {
  return Math.floor(date / 10000000000);
};
