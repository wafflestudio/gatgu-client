import React from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from 'react-native';

import _ from 'lodash';
import { Spinner } from 'native-base';

import { palette } from '@/styles';
import { TPageType } from '@/types/shared';

interface ICursorFlatListProps {
  /** items */
  items: any[];
  /** is Flatlist refreshing */
  refreshing?: boolean;
  /** is First page of cursor pagination */
  isFirstPage: boolean;
  /** max count of items state can have */
  maxItemCount?: number;
  /** is FlatList horizontal */
  horizontal?: boolean;
  /** is fetching next items */
  fetching?: boolean;
  /** get items. */
  getItems: (pageType: TPageType) => void;
  /** render item component */
  renderItem: ListRenderItem<any>;
}

const CursorFlatList: React.FC<ICursorFlatListProps> = ({
  items,
  maxItemCount = 500,
  isFirstPage,
  horizontal,
  refreshing,
  fetching,
  getItems,
  renderItem,
}) => {
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const distFromTop = e.nativeEvent.contentOffset.y;

    if (items.length < maxItemCount || distFromTop !== 0 || isFirstPage) {
      return;
    }

    _.throttle(() => getItems('previous'), 300)();
  };

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(_, idx) => `${idx}`}
        horizontal={horizontal}
        refreshing={refreshing}
        scrollEventThrottle={0.5}
        renderItem={renderItem}
        onRefresh={() => getItems('first')}
        onEndReached={() => getItems('next')}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        ListFooterComponent={fetching ? <Spinner /> : null}
        // TODO:
        ListEmptyComponent={null}
        style={{ backgroundColor: palette.white }}
      />
    </>
  );
};

export default CursorFlatList;
