import React from 'react';

import { Alert, IToastProps, useToast } from 'native-base';

export type OmittedToastProps = Omit<IToastProps, 'status' | 'placement'>;

const useToaster = () => {
  const toast = useToast();

  const defaultToastProps: IToastProps = {
    placement: 'top',
    isClosable: false,
  } as const;

  const toastMaker = (status: IToastProps['status']) => {
    return (toastProps: OmittedToastProps | string) => {
      if (typeof toastProps === 'string') {
        toast.show({
          ...defaultToastProps,
          status,
          title: toastProps,
          render: (props) => (
            <Alert
              {...props}
              maxWidth="90%"
              alignSelf="center"
              status={status ?? 'info'}
              paddingRight={11}
            >
              <Alert.Icon />
              {/* FIXME: I don't know alert height */}
              <Alert.Title
                _text={{
                  overflow: 'visible',
                  flexWrap: 'wrap',
                }}
              >
                {toastProps}
              </Alert.Title>
            </Alert>
          ),
        });
        return;
      }

      toast.show({ ...defaultToastProps, ...toastProps, status });
    };
  };

  const toaster = {
    info: toastMaker('info'),
    success: toastMaker('success'),
    warning: toastMaker('warning'),
    error: toastMaker('error'),
  };

  return toaster;
};

export default useToaster;
