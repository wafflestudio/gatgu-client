import React, { useState } from 'react';
import { TextInput } from 'react-native';

interface IStringInputProps {
  placeholderStyle: Record<string, any>;
  style: Record<string, any>;
  onChangeText: (inp: string) => void;
  value: string;
  [x: string]: any;
}

function StringInput({
  value,
  onChangeText,
  style,
  placeholderStyle,
  ...rest
}: IStringInputProps): JSX.Element {
  const [changed, setChanged] = useState(false);

  const handleInput = (inp: string) => {
    setChanged(true);
    // console.log(inp)
    onChangeText(inp);
  };

  return (
    <TextInput
      onChangeText={(inp) => {
        handleInput(inp);
      }}
      style={!changed ? placeholderStyle : style}
      value={value}
      {...rest}
    />
  );
}

export default StringInput;
