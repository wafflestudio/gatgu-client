// deadline: date 객체가 string 형태로 들어옴.

export const remainTime = (deadline: string): string => {
  const deadlineDay: number = new Date(deadline).getDate();
  const today: number = new Date().getDate();

  const dayLeft: number = deadlineDay - today;

  return dayLeft ? `${dayLeft}일 남았습니다.` : '오늘 마감입니다.';
};

export const calcTimeDiff = (start: Date, end: Date) => {
  const miliseconds = end.valueOf() - start.valueOf();
  const seconds = Math.trunc(miliseconds / 1000);
  const min = Math.trunc(seconds / 60);
  const hour = Math.trunc(min / 60);
  const day = Math.trunc(hour / 24);

  let result, type;
  if (day !== 0) (result = day), (type = '일');
  else if (hour !== 0) (result = hour), (type = '시간');
  else if (min !== 0) (result = min), (type = '분');
  else if (seconds !== 0) (result = seconds), (type = '초');

  return { diff: result, type: type };
};
