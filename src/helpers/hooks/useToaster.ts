import { IToastProps, useToast } from 'native-base';

export type OmittedToastProps = Omit<IToastProps, 'status' | 'placement'>;

const useToaster = () => {
  const toast = useToast();

  const defaultToastProps = {
    placement: 'top',
  } as const;

  const toastMaker = (status: IToastProps['status']) => {
    return (toastProps: OmittedToastProps | string) => {
      if (typeof toastProps === 'string') {
        toast.show({ ...defaultToastProps, status, title: toastProps });
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
