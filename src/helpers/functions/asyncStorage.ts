import AsyncStorage from '@react-native-async-storage/async-storage';

// string을 넣고 빼는 로직
export const StringStorage = {
  get: async (key: string): Promise<string> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) return value;
      else return '';
    } catch (err) {
      console.error(err);
      return '';
    }
  },
  add: (key: string, value: string): void => {
    AsyncStorage.setItem(key, value);
  },
};

// 배열을 다루는 로직
export const ArrayStorage = {
  // (key를 통해 찾은 배열) 맨 앞에 value 추가
  addElem: (key: string, value: string | Record<string, unknown>): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : [];
      parsedValue = [value, ...parsedValue.slice(0, 100)];
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
  // (key를 통해 찾은 배열) 에서 value를 찾아 삭제하여 저장
  removeElem: (key: string, value: string | Record<string, unknown>): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : null;
      parsedValue = parsedValue.filter((item: string) => item !== value);
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
};

export const ObjectStorage = {
  // (key를 통해 찾은 객체)[objKey]의 맨 앞에 value 추가
  addPropArrElem: (
    key: string,
    objKey: string,
    value: string | Record<string, unknown>
  ): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : [];
      parsedValue = { ...parsedValue, objKey: [value, ...parsedValue[objKey]] };
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
  removePropArrElem: (
    key: string,
    objKey: string,
    value: string | Record<string, unknown>
  ): void => {
    AsyncStorage.getItem(key).then((res) => {
      const parsedValue = res !== null ? JSON.parse(res) : null;
      const targetInd = parsedValue[objKey].indexOf(value);
      parsedValue[objKey] = parsedValue[objKey].filter(
        (_: any, ind: number) => ind !== targetInd
      );
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
};

// storage에 값이 객체이면,객체의 key name이 <objKey>인 프로퍼티의 value중 arg의 element 삭제
