import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ViewWindows } from 'react-native-windows';

// TODO: - remove header to somewhere else
//       - remove dummy
//       - change displaying image to adding image --> find which library

const dummyArticle = {
  dummyImage: 'https://reactnative.dev/img/tiny_logo.png',
  title: "Let's buy something!",
  needPeople: 3,
  needMoney: 20000,
  location: 'Seoul National Univeristy 301dong 314',
  description: 'All I wanna do is eat popcorn, netflix and chill.'
}

const WriteArticle = () => {
  return(
    <View>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: 100,
    height: 70,
    borderWidth: 2,
  },
});

export default WriteArticle;
