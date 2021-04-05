import React, { useState, createRef, Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Label } from 'native-base';

import { palette } from '@/styles';
import { ITagType } from '@/types/article';

import styles from './Tags.style';

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
