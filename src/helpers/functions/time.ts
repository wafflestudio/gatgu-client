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

export const getTs = (date?: Date): number => {
  if (typeof date === 'undefined') {
    return Math.floor(DateTime.now().toSeconds());
  }

  return Math.floor(DateTime.fromJSDate(date).toSeconds());
};

export const getTimeDiffWithUnit = (startTs: number, endTs: number) => {
  let unitIdx = -1;
  const tsDiff = Math.floor(Math.abs(endTs - startTs));
  const duration = DateTime.fromSeconds(tsDiff).diff(
    DateTime.fromSeconds(startTs),
    'second'
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
  console.log('ts:', ts);

  return `${getTimeDiffWithUnit(currTs, ts)} 전`;
};

export const getRemainTime = (ts: number) => {
  const currTs = getTs();

  if (ts < currTs) {
    return '기간 만료';
  }

  return `${getTimeDiffWithUnit(currTs, ts)} 남음`;
};
