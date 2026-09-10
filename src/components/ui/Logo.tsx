import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  }[size];

  return (
    <div className={`inline-flex items-center font-serif font-black tracking-tighter select-none ${sizeClasses} ${className}`}>
      <span className="text-white relative font-serif">
        E
        <span className="inline-block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white ml-0.5 -translate-y-2 md:-translate-y-2.5" />
      </span>
    </div>
  );
};
