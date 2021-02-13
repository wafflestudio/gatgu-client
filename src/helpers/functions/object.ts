// Object.entries는 [string,any] type을 return 해서 forEach 문 사용시 에러가 남.
// entries의 return type을 [keyof obj,obj value]로 타입 캐스팅

const customObj = {
  entries<T>(obj: T) {
    return Object.entries(obj) as [keyof T, typeof obj[keyof T]][];
  },
};

export default customObj;
