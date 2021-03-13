import { View, Text, TouchableHighlight } from 'react-native';
import { Label } from 'native-base';
import React, { useState, createRef, Dispatch, SetStateAction } from 'react';
import styles from './Tags.style';
import RBSheet from 'react-native-raw-bottom-sheet';
import { palette } from '@/styles';
import { ITagType } from '@/types/article';

const TagArray = [
  { id: 1, tag: '운동', selected: false },
  { id: 2, tag: '음식', selected: false },
  { id: 3, tag: '가구', selected: false },
  { id: 4, tag: '컴공', selected: false },
  { id: 5, tag: '기계', selected: false },
  { id: 6, tag: '전기', selected: false },
  { id: 7, tag: '방탄', selected: false },
  { id: 8, tag: '엑소', selected: false },
  { id: 9, tag: '빅뱅', selected: false },
];

interface TagsProps {
  tags: ITagType[];
  toggleTags: Dispatch<SetStateAction<ITagType[]>>;
}

function Tags({ tags, toggleTags }: TagsProps): JSX.Element {
  const refRBSheet = createRef<RBSheet>();

  const handleTag = (id: number) => {
    const newTags = tags.map((tag) => {
      const selected = tag.id === id ? !tag.selected : tag.selected;
      return { ...tag, selected };
    });
    toggleTags(newTags);
  };

  const InnerSheet = (
    <View>
      <View style={styles.labelContainer}>
        <Label style={styles.label}>태그</Label>
      </View>
      {tags.map((item) => (
        <View key={item.id}>
          <TouchableHighlight
            onPress={() => handleTag(item.id)}
            underlayColor={palette.whiteGray}
            style={[styles.tagContainer, item.selected && styles.selected]}
          >
            <Text style={styles.tagText}>{item.tag}</Text>
          </TouchableHighlight>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.bigContainer}>
      <TouchableHighlight
        onPress={() => refRBSheet.current.open()}
        underlayColor={palette.whiteGray}
      >
        <Label style={styles.label}>태그</Label>
      </TouchableHighlight>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderRadius: 12,
            minHeight: 700,
            maxHeight: 1000,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        {InnerSheet}
      </RBSheet>
    </View>
  );
}

export default Tags;
