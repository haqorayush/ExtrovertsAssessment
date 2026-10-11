import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, UserCircle, MapPin, Sparkles, PartyPopper } from 'lucide-react';
import clsx from 'clsx';
import type { WizardStep } from '../types/wizard';

interface VerticalProgressProps {
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
  isLoginFlow?: boolean;
}

const REGISTRATION_STEPS = [
  { id: 'step1_auth', label: 'Authentication', subLabel: 'Proving you exist', Icon: Fingerprint },
  { id: 'step2_identity', label: 'Identity', subLabel: 'Who are you?', Icon: UserCircle },
  { id: 'step3_location', label: 'Location', subLabel: "Where's the party?", Icon: MapPin },
  { id: 'step4_manifesto', label: 'Manifesto', subLabel: 'Vibe check', Icon: Sparkles },
];

const LOGIN_STEPS = [
  { id: 'login', label: 'Authentication', subLabel: 'Welcome back', Icon: Fingerprint },
  { id: 'login_verify', label: 'Verification', subLabel: 'Security check', Icon: Sparkles },
];

export const VerticalProgress: React.FC<VerticalProgressProps> = ({ currentStep, onStepClick, isLoginFlow }) => {
  const STEPS = isLoginFlow ? LOGIN_STEPS : REGISTRATION_STEPS;
  // If we are in login flow, we only have one actual "route" ('login') but we can simulate the second step 
  // if the user is on the OTP stage. For now, since 'login' route contains both, we can just highlight the first or both.
  // We'll just highlight the first one. The second one will be "Locked" until they enter OTP, but they don't change route.
  // Let's just pass 'login' and let it highlight the first step.
  const currentIndex = STEPS.findIndex(s => s.id === currentStep) !== -1 ? STEPS.findIndex(s => s.id === currentStep) : 0;
  
  if (currentStep === 'landing' || currentStep === 'success') return null;

  return (
    <div className="hidden md:flex flex-col justify-center pl-8 lg:pl-12 w-56 lg:w-72 shrink-0 py-10 relative z-20 bg-transparent">
      <div className="flex flex-col justify-between h-[400px] relative">
        
        {/* Track Container (spans exactly between first and last item centers) */}
        <div className="absolute top-6 bottom-6 left-[22px] w-1">
          {/* Background Track line (Dotted) */}
          <div className="absolute inset-0 rounded-full bg-white/5" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.15) 50%)', backgroundSize: '100% 16px' }} />
          
          {/* Active Fill line (Solid glowing with moving colors) */}
          <motion.div 
            className="absolute top-0 left-0 w-full rounded-full overflow-hidden shadow-[0_0_25px_rgba(217,70,239,0.8)]"
            initial={{ height: 0 }}
            animate={{ height: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
          >
            {/* Moving Gradient inside the line */}
            <motion.div
              className="w-full h-[200%]"
              style={{
                background: 'linear-gradient(to bottom, #d946ef, #8b5cf6, #ec4899, #f59e0b, #d946ef, #8b5cf6, #ec4899, #f59e0b, #d946ef)'
              }}
              animate={{ y: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </motion.div>
        </div>

        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isClickable = index <= currentIndex;

          const Icon = step.Icon;

          return (
            <div key={step.id} className="relative z-10 flex items-center gap-5 group">
              <button
                onClick={() => isClickable && onStepClick(step.id as WizardStep)}
                disabled={!isClickable}
                className={clsx(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                  isActive ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.6)] rotate-3 scale-110" : 
                  isCompleted ? "bg-[#251A3D] text-fuchsia-400 border border-fuchsia-500/50 hover:bg-[#342456] cursor-pointer" : 
                  "bg-black/40 text-white/30 border border-white/10 cursor-not-allowed rotate-0 scale-90 backdrop-blur-md"
                )}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5 }}>
                    <PartyPopper className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Icon className={clsx("w-5 h-5 transition-transform duration-500", isActive && "animate-pulse")} />
                )}
                
                {/* Ping animation for active step */}
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl border-2 border-white opacity-50 animate-ping" />
                )}
              </button>
              
              <div className="flex flex-col cursor-default">
                <span className={clsx(
                  "text-xs font-black uppercase tracking-widest transition-colors duration-300",
                  isActive ? "text-white" : isCompleted ? "text-white/70" : "text-white/30"
                )}>
                  {step.label}
                </span>
                
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.span 
                      key="active-sub"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[11px] font-bold text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full w-fit mt-1 border border-fuchsia-500/20 shadow-[0_0_10px_rgba(217,70,239,0.2)]"
                    >
                      {step.subLabel}
                    </motion.span>
                  ) : isCompleted ? (
                    <motion.span 
                      key="completed-sub"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-bold text-emerald-400 mt-1 uppercase tracking-widest flex items-center gap-1"
                    >
                      ✓ Nailed it
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="future-sub"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-bold text-white/30 mt-1 uppercase tracking-widest"
                    >
                      Locked
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
