import { toast, type ToastOptions } from 'react-toastify';


export const useToast = () => {
  return {
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, {
        ...options,
      });
    },

    error: (message: string, options?: ToastOptions) => {
      toast.error(message, {
        ...options,
      });
    },

    info: (message: string, options?: ToastOptions) => {
      toast.info(message, {
        ...options,
      });
    },

    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, {
        ...options,
      });
    },

    loading: (message: string, options?: ToastOptions) => {
      return toast.loading(message, {
        ...options,
      });
    },

    dismiss: (toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },

    update: (
      toastId: string | number,
      options: ToastOptions & { render?: string }
    ) => {
      toast.update(toastId, {
        ...options,
      });
    },
  };
}; 