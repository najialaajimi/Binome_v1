import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const classNames = {
    success: 'alert alert-success',
    danger: 'alert alert-danger',
    warning: 'alert alert-warning',
    info: 'alert'
  };

  return (
    <div className={classNames[type] || 'alert'}>
      <div className="flex-between">
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '1.25rem',
              marginLeft: '1rem'
            }}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
