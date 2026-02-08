import React from 'react';

const Loading = ({ size = 'medium', text = 'Chargement...' }) => {
  const sizes = {
    small: '24px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div className="loading-container flex-col gap-2">
      <div 
        className="spinner" 
        style={{ width: sizes[size], height: sizes[size] }}
      ></div>
      {text && <p className="text-secondary">{text}</p>}
    </div>
  );
};

export default Loading;
