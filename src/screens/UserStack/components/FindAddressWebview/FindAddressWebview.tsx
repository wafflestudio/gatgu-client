import React from 'react';
import { WebView } from 'react-native-webview';

export interface IMapWebviewProps {
  onSelect: (address: string) => void;
}

const FindAddressWebview: React.FC<IMapWebviewProps> = ({ onSelect }) => {
  return (
    <WebView
      source={{
        uri:
          'https://gatgubucket.s3.ap-northeast-2.amazonaws.com/webview/findAddress.html',
      }}
      scalesPageToFit
      overScrollMode="content"
      onMessage={(e) => {
        onSelect(e.nativeEvent.data);
      }}
    />
  );
};

export default FindAddressWebview;
