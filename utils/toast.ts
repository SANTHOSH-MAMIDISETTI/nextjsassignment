import toast from 'react-hot-toast';

// Utility function to show toast notifications
export const showToast = (message: string, type: 'success' | 'error' | 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast(message); // react-hot-toast doesn't have a specific info type, it uses the default toast
      break;
  }
};
