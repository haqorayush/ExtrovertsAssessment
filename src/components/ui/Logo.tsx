import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img 
        src="/assets/extroverts-logo.png" 
        alt="Extroverts Logo" 
        className={`${sizeClasses} w-auto object-contain`} 
      />
    </div>
  );
};
