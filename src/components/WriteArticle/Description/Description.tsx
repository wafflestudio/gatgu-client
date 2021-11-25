import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View } from 'react-native';

import waStyles from '../WriteArticle.style';
import styles from './Description.style';

interface DescriptionProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  editable: boolean;
}

function Description({
  description,
  setDescription,
  editable,
}: DescriptionProps): JSX.Element {
  const ref = React.useRef<TextInput | null>(null);

  const handleContainerTouch = () => {
    ref.current?.focus();
  };

  return (
    <View style={styles.bigContainer} onTouchStart={handleContainerTouch}>
      <TextInput
        ref={ref}
        value={description}
        style={[waStyles.text]}
        placeholder="내용"
        onChangeText={setDescription}
        multiline={true}
        editable={editable}
      />
    </View>
  );
}
export default Description;
