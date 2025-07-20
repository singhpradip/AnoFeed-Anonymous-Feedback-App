import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-center',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToast = () => {
  return {
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, {
        ...defaultOptions,
        autoClose: 3000,
        ...options,
      });
    },

    error: (message: string, options?: ToastOptions) => {
      toast.error(message, {
        ...defaultOptions,
        autoClose: 5000,
        ...options,
      });
    },

    info: (message: string, options?: ToastOptions) => {
      toast.info(message, {
        ...defaultOptions,
        autoClose: 4000,
        ...options,
      });
    },

    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, {
        ...defaultOptions,
        autoClose: 4000,
        ...options,
      });
    },

    loading: (message: string, options?: ToastOptions) => {
      return toast.loading(message, {
        ...defaultOptions,
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

    update: (toastId: string | number, options: ToastOptions & { render?: string }) => {
      toast.update(toastId, {
        ...defaultOptions,
        ...options,
      });
    },
  };
}; 