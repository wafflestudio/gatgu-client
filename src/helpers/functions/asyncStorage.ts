import AsyncStorage from '@react-native-async-storage/async-storage';

// string을 넣고 빼는 로직
export const StringStorage = {
  //< @brief      get value by key, 이때 값이 없거나 오류가 발생하면 에러를 출력
  //< @params key asyncStorage에 저장되어 있는 key값
  //< @retval     asyncStorage.getItem(key)
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
  //< @brief        add value by key
  //< @params key   asyncStorage에 저장할 key값
  //< @params value asyncStorage[key]에 저장할 값
  add: (key: string, value: string): void => {
    AsyncStorage.setItem(key, value);
  },
  //< @brief        delete value by key
  //< @params key   asyncStorage에서 삭제할 key값
  remove: (key: string): Promise<void> => {
    return AsyncStorage.removeItem(key);
  },
};

// 배열을 다루는 로직
export const ArrayStorage = {
  // (key를 통해 찾은 배열) 맨 앞에 value 추가
  addElem: (
    key: string,
    value: string | Record<string, unknown>
  ): Promise<void> => {
    return AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : [];
      parsedValue = [value, ...parsedValue.slice(0, 100)];
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
  // (key를 통해 찾은 배열) 에서 value를 찾아 삭제하여 저장
  removeElem: (
    key: string,
    value: string | Record<string, unknown>
  ): Promise<void> => {
    return AsyncStorage.getItem(key).then((res) => {
      const parsedValue = res !== null ? JSON.parse(res) : null;
      const targetInd = parsedValue.indexOf(value);
      const filteredValue = parsedValue.filter(
        (_: any, ind: number) => ind !== targetInd
      );
      AsyncStorage.setItem(key, JSON.stringify(filteredValue));
    });
  },
};

export const ObjectStorage = {
  //< @brief        add object by key
  //< @params key   asyncStorage에 저장할 key값
  //< @params value asyncStorage[key]에 저장할 값
  addObject: <T extends any>(
    key: string,
    value: T | Record<string, unknown>
  ): Promise<void> => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  //< @brief        get object by key
  //< @params key   asyncStorage에서 찾고 싶은 key값
  getObject: async <T>(key: string): Promise<T | null> => {
    const result = await AsyncStorage.getItem(key);
    if (result) return JSON.parse(result) as T;
    else return null;
  },
  //< @brief        remove object by key
  //< @params key   asyncStorage에서 삭제하고 싶은 key값
  removeObject: (key: string): void => {
    AsyncStorage.removeItem(key);
  },
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
  // (key를 통해 찾은 객체)[objKey] 배열에서 value 찾아서 제거
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
