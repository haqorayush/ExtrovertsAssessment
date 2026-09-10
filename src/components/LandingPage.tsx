import React from 'react';
import { Logo } from './ui/Logo';

interface LandingPageProps {
  onContinue: () => void;
  onOpenTerms: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onContinue, onOpenTerms }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#000000] text-white">
      {/* Background Graphic Asset with Fallback Radial Gradients */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{
          backgroundImage: `url('/assets/landing-bg.jpg')`,
        }}
      >
        {/* Soft gradient bottom blend into pitch black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* Top spacing */}
      <div className="relative z-10 w-full pt-8 px-6 flex justify-end">
        <button
          onClick={onOpenTerms}
          className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors underline underline-offset-4"
        >
          Terms & Conditions
        </button>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center flex flex-col items-center justify-center my-auto">
        {/* E• Logo */}
        <div className="mb-14 sm:mb-16 transform hover:scale-105 transition-transform duration-300">
          <Logo size="lg" />
        </div>

        {/* Text Block */}
        <div className="space-y-3">
          <p className="text-white/90 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase font-poppins">
            AN APP ONLY FOR
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-black tracking-tight font-poppins">
            EXTROVERTS
          </h1>
        </div>

        {/* Warning text */}
        <div className="mt-8 max-w-[280px] sm:max-w-xs text-center text-xs sm:text-sm leading-relaxed text-white/90 font-medium">
          <span className="text-[#FF5A5F] font-bold">Warning:</span>{' '}
          Entering may lead to spontaneous dancing and unsolicited high-fives!
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 pb-10 sm:pb-12">
        <button
          onClick={onContinue}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-white text-black font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};
