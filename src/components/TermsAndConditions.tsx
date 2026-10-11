import React, { useState } from 'react';
import { Logo } from './ui/Logo';
import { ChevronRight, Shield, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsAndConditionsProps {
  onAccept: () => void;
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept, onBack }) => {
  const [showFullTermsModal, setShowFullTermsModal] = useState(false);
  const [hasAgreedCheckbox, setHasAgreedCheckbox] = useState(true);

  return (
    <motion.div 
      layout
      className="flex flex-col lg:flex-row bg-transparent text-white max-w-full"
    >
      {/* Left Panel: General Terms */}
      <motion.div layout className="flex-none flex flex-col w-[90vw] lg:w-[600px]">
        {/* Top Header */}
        <div className="w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={onBack}
            className="text-xs text-white/60 hover:text-white uppercase tracking-wider underline underline-offset-4 transition-colors"
          >
            Back
          </button>
        </div>

        {/* Main Manifesto Copy */}
        <div className="w-full px-6 md:px-10 my-auto py-4">
          <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold text-left uppercase leading-snug sm:leading-relaxed tracking-tight font-poppins">
            BY USING THIS APP, YOU’RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO AGREEING TO OUR TERMS AND CONDITIONS. POLITENESS IS A MUST—TREAT OTHERS HOW YOU’D WANT TO BE TREATED. EVERYONE HERE IS LOOKING FOR REASONS TO{' '}
            <span className="text-[#9333EA] font-semibold">PARTY</span>
            , SO BRING YOUR BEST VIBE AND EXPECT THE SAME FROM OTHERS. LET'S PARTY RESPONSIBLY AND MAKE EVERY EXPERIENCE A GREAT ONE!
          </h2>

          <AnimatePresence mode="wait">
            {!showFullTermsModal && (
              <motion.div 
                key="expand-button"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="mt-8 pt-6 border-t border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setShowFullTermsModal(true)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white/90">
                      View Detailed Community Guidelines & Privacy
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Action Area */}
        <div className="w-full px-6 md:px-10 pb-6 md:pb-10 space-y-4">
          <div className="flex items-center gap-3 justify-center text-xs text-white/80">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAgreedCheckbox}
                onChange={(e) => setHasAgreedCheckbox(e.target.checked)}
                className="w-4 h-4 rounded bg-black border-white/40 text-purple-600 focus:ring-purple-500"
              />
              <span>
                To proceed, accept{' '}
                <button
                  type="button"
                  onClick={() => setShowFullTermsModal(true)}
                  className="underline underline-offset-2 hover:text-white font-semibold"
                >
                  Terms and Conditions
                </button>
              </span>
            </label>
          </div>

          <button
            onClick={onAccept}
            disabled={!hasAgreedCheckbox}
            type="button"
            className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 ${
              hasAgreedCheckbox
                ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
                : 'bg-white/30 text-white/40 cursor-not-allowed'
            }`}
          >
            ACCEPT
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFullTermsModal && (
          <motion.div
            key="detailed-terms"
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: 'auto', height: 'auto' }}
            exit={{ opacity: 0, width: 0, height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="flex-none flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 bg-black/20 overflow-hidden"
          >
            <div className="w-[90vw] lg:w-[400px] p-6 sm:p-8 md:p-10 flex-none flex flex-col max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-transparent backdrop-blur-xl z-10 -mt-4 pt-4 mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Extroverts Terms & Safety Code
                </h3>
                <button
                  onClick={() => setShowFullTermsModal(false)}
                  className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed pr-2">
                <div>
                  <h4 className="font-bold text-white mb-1.5 text-base">1. Age Requirement (Strictly 18+)</h4>
                  <p>
                    Extroverts is designed solely for adults aged 18 and older. Any profile created by a minor will be terminated immediately to preserve community safety.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-1.5 text-base">2. Zero Tolerance for Harassment</h4>
                  <p>
                    Consent, mutual respect, and friendly vibes are strictly enforced. Unsolicited physical contact, stalking, harassment, hate speech, or intoxicated disruption will result in a permanent ban and Party Rep blacklisting.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-1.5 text-base">3. Host & Guest Responsibilities</h4>
                  <p>
                    Events hosted via Extroverts must comply with all local laws and noise regulations. "Sip in, chip in" — respect venue rules and host requests.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-1.5 text-base">4. Privacy & Data Handling</h4>
                  <p>
                    We do not sell your personal data. Location details are only used to recommend parties in your immediate city or college campus.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-auto flex justify-end">
                <button
                  onClick={() => {
                    setHasAgreedCheckbox(true);
                    setShowFullTermsModal(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20"
                >
                  <Check className="w-4 h-4" />
                  I Understand & Agree
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
