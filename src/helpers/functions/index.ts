// deadline: date 객체가 string 형태로 들어옴.
export const remainTime = (deadline: string): string => {
  const deadlineDay: number = new Date(deadline).getDate();
  const today: number = new Date().getDate();

  const dayLeft: number = deadlineDay - today;

  return dayLeft ? `${dayLeft}일 남았습니다.` : '오늘 마감입니다.';
};

// TODO: Will change after discussing how to display time
export const calcTimeDiff = (start: Date, end: Date) => {
  // do calculations to convert accordingly
  return end.valueOf() - start.valueOf();
};
