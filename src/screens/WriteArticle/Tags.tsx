import { View, Text, TouchableHighlight } from 'react-native';
import { Label } from 'native-base';
import React, { useState } from 'react';
import styles from './Tags.style';
import { TagArray } from '@/constants/Enum';

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
      <Label style={[styles.label, styles.padding]}>태그</Label>
      {tags.map((arr, k) => (
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
      ))}
    </View>
  );
}

export default Tags;
