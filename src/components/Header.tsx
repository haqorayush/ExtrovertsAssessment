import React from 'react';
import { Logo } from './ui/Logo';

interface HeaderProps {
  showGettingReady?: boolean;
  stepNumber?: number;
  totalSteps?: number;
  onLogoClick?: () => void;
  rightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  showGettingReady = true,
  stepNumber,
  totalSteps = 4,
  onLogoClick,
  rightContent
}) => {
  return (
    <header className={`w-full relative z-20 bg-transparent pb-2`}>
      <div className="w-full pt-6 pb-4 px-6 md:px-8 flex items-center justify-between select-none">
        <button 
          onClick={onLogoClick} 
          type="button" 
          className="focus:outline-none transition-opacity hover:opacity-80 active:scale-95"
          title="Go to Start"
        >
          <Logo size="md" />
        </button>

        {rightContent ? (
          rightContent
        ) : showGettingReady ? (
          <div className="flex items-center gap-3">
            {stepNumber && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white/70 border border-white/10">
                Step {stepNumber} of {totalSteps}
              </span>
            )}
            <span className="text-white font-extrabold text-sm sm:text-base tracking-wider uppercase font-poppins">
              GETTING READY
            </span>
          </div>
        ) : null}
      </div>

    </header>
  );
};

