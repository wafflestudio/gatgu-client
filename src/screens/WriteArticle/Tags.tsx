import { View, Text, TouchableHighlight } from 'react-native';
import { Label } from 'native-base';
import React, { useState } from 'react';
import styles from './Tags.style';

const TagArray = [
  [
    // TODO: check
    // 여기 selected 안 없어졌네요?
    { id: 1, tag: '운동', selected: false },
    { id: 2, tag: '음식', selected: false },
    { id: 3, tag: '가구', selected: false },
  ],
  [
    { id: 4, tag: '컴공', selected: false },
    { id: 5, tag: '기계', selected: false },
    { id: 6, tag: '전기', selected: false },
  ],
  [
    { id: 7, tag: '방탄', selected: false },
    { id: 8, tag: '엑소', selected: false },
    { id: 9, tag: '빅뱅', selected: false },
  ],
];

function Tags(): JSX.Element {
  const [tags, toggleTags] = useState(TagArray);
  const handleTag = (id: number) => {
    const newTags = tags.map((arr) =>
      arr.map((tag) => {
        const selected = tag.id === id ? !tag.selected : tag.selected;
        return { ...tag, selected };
      })
    );
    toggleTags(newTags);
  };

  return (
    <View style={styles.bigContainer}>
      <Label style={styles.label}>태그</Label>
      {/* {tags.map((arr, k) => (
        <View key={k} style={styles.outer}>
          {arr.map((tag) => (
            <View key={tag.id} style={styles.margin}>
              <TouchableHighlight onPress={() => handleTag(tag.id)}>
                <View style={[styles.inner, tag.selected && styles.selected]}>
                  <Text>{tag.tag}</Text>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      ))} */}
    </View>
  );
}

export default Tags;
