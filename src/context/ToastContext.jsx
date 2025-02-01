import { createContext, useContext, useState } from 'react';
import styles from './Toast.module.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: '' });
  const [visible, setVisible] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };


  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
