import AsyncStorage from '@react-native-async-storage/async-storage';

// asyncStorage 관련 로직을 따로 빼놓은 것.

const asyncStorageFunc = {
  // storage에 값이 배열이면, 배열의 앞쪽에 새로운 element 추가
  // storage에 값이 객체이면,객체의 key name이 <objKey>인 프로퍼티의 value에 element 추가
  addPropArrElem: (
    key: string,
    value: string | Record<string, unknown>,
    objKey?: string
  ): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : [];
      if (parsedValue instanceof Array) {
        parsedValue = [value, ...parsedValue.slice(0, 100)];
      } else if (parsedValue instanceof Object && objKey) {
        parsedValue = parsedValue[objKey].filter(
          (elem: string) => elem !== value
        );
      }
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },

  // storage에 값이 배열이면, value에 해당하는 값 삭제
  // storage에 값이 객체이면,객체의 key name이 <objKey>인 프로퍼티의 value중 arg의 element 삭제
  removePropArrElem: (
    key: string,
    value: string | Record<string, unknown>,
    objKey?: string
  ): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : null;
      if (parsedValue instanceof Array) {
        parsedValue = parsedValue.filter((elem: string) => elem !== value);
      } else if (parsedValue instanceof Object && objKey) {
        parsedValue = parsedValue[objKey].filter(
          (elem: string) => elem !== value
        );
      }
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
};

export default asyncStorageFunc;
