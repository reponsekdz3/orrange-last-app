import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-300 transform";
  
  let typeClasses = '';
  switch (type) {
    case 'success':
      typeClasses = 'bg-green-500';
      break;
    case 'error':
      typeClasses = 'bg-red-500';
      break;
    case 'info':
      typeClasses = 'bg-blue-500';
      break;
  }
  
  const visibilityClasses = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';

  return (
    <div className={`${baseClasses} ${typeClasses} ${visibilityClasses}`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">X</button>
    </div>
  );
};
