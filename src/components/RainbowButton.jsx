'use client';

import React from 'react';
import './RainbowButton.css';

export default function RainbowButton({
  children,
  href,
  onClick,
  className = "",
  type,
  ...props
}) {
  if (href) {
    return (
      <a 
        href={href} 
        className={`rainbow-button ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type || "button"}
      className={`rainbow-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
