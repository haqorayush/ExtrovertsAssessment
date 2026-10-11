import React from 'react';
import { Logo } from './ui/Logo';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onRegister: () => void;
  onLogin: () => void;
  onOpenTerms: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onRegister, onLogin, onOpenTerms }) => {
  return (
    <motion.div 
      className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden bg-transparent text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top spacing */}
      <div className="relative z-10 w-full pt-8 px-6 md:px-12 flex justify-end">
        <button
          onClick={onOpenTerms}
          className="text-xs uppercase tracking-wider font-bold text-white/50 hover:text-white transition-colors underline underline-offset-4"
        >
          Terms & Conditions
        </button>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto">
        <motion.div 
          className="mb-14 sm:mb-20 transform"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <Logo size="lg" />
        </motion.div>

        {/* Text Block */}
        <motion.div 
          className="space-y-4 md:space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <p className="text-white/80 font-bold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-poppins">
            AN APP ONLY FOR
          </p>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight font-poppins drop-shadow-2xl pr-2">
            EXTROVERTS
          </h1>
        </motion.div>

        {/* Warning text with Glassmorphism */}
        <motion.div 
          className="mt-10 text-xs sm:text-sm font-medium tracking-wide max-w-sm mx-auto text-center text-white/90 bg-[#130F25]/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <span className="text-[#FF5A5F] font-bold">Warning:</span>{' '}
          Entering may lead to spontaneous dancing and unsolicited high-fives!
        </motion.div>
      </div>

      {/* Bottom Action Area */}
      <motion.div 
        className="relative z-10 w-full max-w-xl mx-auto px-6 pb-10 sm:pb-16 flex flex-col sm:flex-row gap-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7, type: 'spring' }}
      >
        <button
          onClick={onRegister}
          type="button"
          data-primary="true"
          className="w-full flex-1 py-4 sm:py-5 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/20 relative overflow-hidden group"
        >
          <span className="relative z-10">First time?</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        </button>

        <button
          onClick={onLogin}
          type="button"
          className="w-full flex-1 py-4 sm:py-5 px-4 rounded-2xl bg-black/40 backdrop-blur-xl text-fuchsia-300 font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:bg-[#251A3D] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-fuchsia-500/30 hover:border-fuchsia-400"
        >
          Wanna Login
        </button>
      </motion.div>
    </motion.div>
  );
};
