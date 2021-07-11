import React, { useState } from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
  FlatListProps,
} from 'react-native';

import _ from 'lodash';
import { Flex, Spinner } from 'native-base';

import { palette } from '@/styles';
import { TPageType } from '@/types/shared';

interface ICursorFlatListProps {
  /** items */
  items: any[];
  /** is First page of cursor pagination */
  isFirstPage: boolean;
  /** max count of items state can have */
  maxItemCount?: number;
  /** is FlatList horizontal */
  horizontal?: boolean;
  /** is fetching next items */
  fetching?: boolean;
  /** is CursorFlatList loading */
  loading?: boolean;
  /** showed when no item exists */
  ListEmptyComponent?: FlatListProps<any>['ListEmptyComponent'];
  /** get items. */
  getItems: (pageType: TPageType) => Promise<unknown>;
  /** render item component */
  renderItem: ListRenderItem<any>;
}

const CursorFlatList: React.FC<ICursorFlatListProps> = ({
  items,
  maxItemCount = 500,
  isFirstPage,
  horizontal,
  fetching,
  loading,
  ListEmptyComponent,
  getItems,
  renderItem,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const distFromTop = e.nativeEvent.contentOffset.y;

    if (items.length < maxItemCount || distFromTop !== 0 || isFirstPage) {
      return;
    }

    _.throttle(() => getItems('previous'), 300)();
  };

  if (loading) {
    return (
      <Flex height="100%">
        <Spinner paddingTop="50%" />
      </Flex>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(_, idx) => `${idx}`}
      horizontal={horizontal}
      refreshing={refreshing}
      scrollEventThrottle={0.5}
      renderItem={renderItem}
      onRefresh={() => {
        setRefreshing(true);
        getItems('first').then(() => {
          setRefreshing(false);
        });
      }}
      onEndReached={() => getItems('next')}
      onEndReachedThreshold={0.1}
      onScroll={handleScroll}
      ListFooterComponent={fetching ? <Spinner /> : null}
      ListEmptyComponent={ListEmptyComponent}
      style={{ backgroundColor: palette.white, height: '100%' }}
    />
  );
};

export default CursorFlatList;
