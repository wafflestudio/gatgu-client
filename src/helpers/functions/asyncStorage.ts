import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageFunc = {
  addPropArrElem: (key: string, value: string): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : [];
      if (parsedValue instanceof Array) {
        parsedValue = [value, ...parsedValue.slice(0, 100)];
      }
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },

  removePropArrElem: (key: string, value: string): void => {
    AsyncStorage.getItem(key).then((res) => {
      let parsedValue = res !== null ? JSON.parse(res) : null;
      if (typeof parsedValue === typeof Array) {
        parsedValue = parsedValue.filter((elem: string) => elem !== value);
      }
      AsyncStorage.setItem(key, JSON.stringify(parsedValue));
    });
  },
};

export default asyncStorageFunc;
