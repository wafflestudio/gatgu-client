import React from 'react';

export interface ICheckProps {
  title: string;
  checked: boolean;
  // FIXME: Dispatch<SetStateAction<boolean>>
  setCheck: any;
}

function Check(): JSX.Element {
  return <></>;
}

export default Check;
