import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';

import styles from './TopBubble.style';

interface ITopBubbleProps {
  current?: number;
  goal: number;
  end: number;
  pEnd: number;
}

const TopBubble: React.FC<ITopBubbleProps> = ({ current, goal, end, pEnd }) => {
  const [width, setWidth] = useState(0);

  const getCoorBar = (event: LayoutChangeEvent) => {
    const ev = event.nativeEvent.layout;
    setWidth(ev.width);
  };
  const calcLeft = useMemo(() => {
    let left: number;
    let side:
      | 'flex-start'
      | 'flex-end'
      | 'auto'
      | 'center'
      | 'stretch'
      | 'baseline'
      | undefined;
    let sliderPos: any;

    if (pEnd < width / 2) {
      left = 0;
      side = 'flex-start';
      sliderPos = pEnd - 3;
    } else if (pEnd > end - width / 2) {
      left = 0;
      side = 'flex-end';
      sliderPos = pEnd - end + width - 3; // -3: offset --> 육안으로 봤을 때 -3 안 하면 조금 안 맞음
    } else {
      left = pEnd - width / 2;
      side = 'flex-start';
      sliderPos = width / 2 - 3;
    }
    return { left, side, sliderPos };
  }, [pEnd, end, width]);

  return (
    <View style={{ alignSelf: calcLeft.side, left: calcLeft.left }}>
      <View style={styles.box} onLayout={getCoorBar}>
        <Text style={styles.text}>{`${goal} 중 ${current}'원' 모였어요!`}</Text>
      </View>
      <View style={{ width: width }}>
        <View style={[styles.triangle, { left: calcLeft.sliderPos }]} />
      </View>
    </View>
  );
};
export default TopBubble;
