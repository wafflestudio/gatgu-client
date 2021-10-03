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
              alignSelf="center"
              status={status ?? 'info'}
              flexDir="row"
              display="flex"
              _text={{
                flexDir: 'row',
              }}
            >
              <Alert.Icon />
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
