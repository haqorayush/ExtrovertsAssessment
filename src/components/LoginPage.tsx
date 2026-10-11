import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Loader2, RefreshCw, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  stage: 'login' | 'login_verify';
  initialIdentifier?: string;
  initialOtp?: string;
  onSendCode: () => void;
  onSuccess: () => void;
  onBack: () => void;
  onErrorToast: (msg: string, type: 'success' | 'error') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  stage, 
  initialIdentifier = '',
  initialOtp = '',
  onSendCode, 
  onSuccess, 
  onBack, 
  onErrorToast 
}) => {
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [inputError, setInputError] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // OTP state
  const [otpDigits, setOtpDigits] = useState<string[]>(() => {
    if (initialOtp && initialOtp.length === 6) {
      return initialOtp.split('');
    }
    return ['', '', '', '', '', ''];
  });
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isShake, setIsShake] = useState(false);
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Resend countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (stage === 'login_verify' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, resendTimer]);



  // Validation
  const validateIdentifier = (val: string, type: 'email' | 'phone') => {
    const trimmed = val.trim();
    if (!trimmed) {
      return type === 'email' ? 'Email address is required.' : 'Phone number is required.';
    }
    if (type === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
    } else {
      const phoneClean = trimmed.replace(/\D/g, '');
      if (phoneClean.length < 10 || phoneClean.length > 13) return 'Phone number must be at least 10 digits.';
    }
    return '';
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIdentifier(val);
    if (inputError) setInputError(validateIdentifier(val, authType));
  };

  const handleSendCode = () => {
    const err = validateIdentifier(identifier, authType);
    if (err) {
      setInputError(err);
      onErrorToast(err, 'error');
      return;
    }
    setIsSendingCode(true);
    setTimeout(() => {
      setIsSendingCode(false);
      onSendCode();
      setResendTimer(30);
      setOtpError('');
      setTimeout(() => digitInputRefs.current[0]?.focus(), 150);
    }, 900);
  };

  // OTP handlers
  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal && val !== '') return;
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);
    setOtpError('');
    if (cleanVal && index < 5) digitInputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const newDigits = [...otpDigits];
      newDigits[index - 1] = '';
      setOtpDigits(newDigits);
      digitInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) newDigits[i] = pasted[i] || '';
      setOtpDigits(newDigits);
      const nextIdx = Math.min(pasted.length, 5);
      digitInputRefs.current[nextIdx]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const fullCode = otpDigits.join('');
    if (fullCode.length < 6) {
      setOtpError('Please enter all 6 digits.');
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (fullCode !== '123456') {
        setOtpError('Invalid verification code.');
        setIsShake(true);
        setTimeout(() => setIsShake(false), 500);
        onErrorToast('Incorrect verification code.', 'error');
      } else {
        onErrorToast('Welcome back! Let\'s party 🎉', 'success');
        onSuccess();
      }
    }, 800);
  };

  const isOtpComplete = otpDigits.join('').length === 6;

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-transparent text-white relative">
      {/* Main Content */}
      <main className="w-full max-w-md mx-auto px-6 py-4 my-auto overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {stage === 'login' ? (
            <motion.div
              key="login-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-3">
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <KeyRound className="w-3 h-3" />
                  Welcome back
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-poppins leading-tight">
                  Ready to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
                    party again?
                  </span>
                </h2>
                <p className="text-sm text-white/60 font-medium">
                  Drop your details and we'll verify it's really you.
                </p>
              </div>

              {/* Auth Type Toggle */}
              <div className="flex rounded-2xl bg-[#141026] p-1.5 border border-white/10 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setAuthType('email'); setInputError(''); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                    authType === 'email'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthType('phone'); setInputError(''); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                    authType === 'phone'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
                  {authType === 'email' ? 'Your email' : 'Your phone number'}
                </label>
                <input
                  type={authType === 'email' ? 'email' : 'tel'}
                  value={identifier}
                  onChange={handleIdentifierChange}
                  onBlur={() => setInputError(validateIdentifier(identifier, authType))}
                  placeholder={authType === 'email' ? 'partyanimal@vibe.com' : '9876543210'}
                  className={`w-full px-5 py-4 rounded-2xl bg-[#120D24] text-white placeholder-white/25 border-2 transition-all text-sm font-bold focus:outline-none ${
                    inputError
                      ? 'border-red-500/60 focus:ring-2 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20'
                  }`}
                />
                {inputError && (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {inputError}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-3">
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ShieldCheck className="w-3 h-3" />
                  Almost there
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-poppins leading-tight">
                  Prove it's{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    really you
                  </span>
                </h2>
                <p className="text-sm text-white/60 font-medium">
                  We sent a 6-digit code to{' '}
                  <span className="text-white font-bold">{identifier}</span>
                  <button
                    type="button"
                    onClick={() => { onBack(); setOtpDigits(['', '', '', '', '', '']); setOtpError(''); }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 font-bold text-xs ml-2 underline underline-offset-2"
                  >
                    Change
                  </button>
                </p>
              </div>

              {/* OTP Input */}
              <div className={`space-y-3 ${isShake ? 'animate-shake' : ''}`}>
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
                  Verification code
                </label>
                <div className="flex items-center justify-between gap-2.5" onPaste={handlePaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { digitInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-black rounded-2xl bg-[#140F2A] border-2 transition-all focus:outline-none ${
                        otpError
                          ? 'border-red-500 text-red-300 focus:ring-2 focus:ring-red-500/30'
                          : digit
                          ? 'border-fuchsia-400 text-white bg-fuchsia-950/30 shadow-[0_0_12px_rgba(217,70,239,0.2)]'
                          : 'border-white/15 text-white focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20'
                      }`}
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {otpError}
                  </p>
                )}
              </div>

              {/* Resend */}
              <div className="flex items-center justify-start text-xs">
                {resendTimer > 0 ? (
                  <span className="text-white/50 font-medium">
                    Resend code in <strong className="text-white font-mono">{resendTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setResendTimer(30);
                      onErrorToast('New verification code sent to ' + identifier, 'success');
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Resend Code
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Actions */}
      <footer className="w-full max-w-md mx-auto px-6 pb-10 sm:pb-12 space-y-3">
        {stage === 'login' ? (
          <button
            onClick={(e) => {
              if (isSendingCode || !identifier.trim()) { e.preventDefault(); return; }
              handleSendCode();
            }}
            aria-disabled={isSendingCode || !identifier.trim()}
            type="button"
            data-primary="true"
            title={!identifier.trim() ? 'Enter your email or phone number to continue.' : undefined}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group ${
              identifier.trim() && !isSendingCode
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-white/20'
                : 'bg-white/15 text-white/40 cursor-not-allowed border border-white/10'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSendingCode ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending code...</>
              ) : (
                'Send me a code'
              )}
            </span>
            {identifier.trim() && !isSendingCode && (
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            )}
          </button>
        ) : (
          <button
            onClick={(e) => {
              if (isVerifying || !isOtpComplete) { e.preventDefault(); return; }
              handleVerifyOtp();
            }}
            aria-disabled={isVerifying || !isOtpComplete}
            type="button"
            data-primary="true"
            title={!isOtpComplete ? 'Enter all 6 digits of the OTP to continue.' : undefined}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group ${
              isOtpComplete && !isVerifying
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-white/20'
                : 'bg-white/15 text-white/40 cursor-not-allowed border border-white/10'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isVerifying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
              ) : (
                'Let me in'
              )}
            </span>
            {isOtpComplete && !isVerifying && (
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            )}
          </button>
        )}

        <button
          onClick={() => {
            onBack();
          }}
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-black/40 backdrop-blur-md text-white font-extrabold text-sm sm:text-base tracking-widest uppercase border border-white/15 hover:bg-white/10 hover:border-white/30 active:scale-[0.98] transition-all duration-300"
        >
          Back
        </button>
      </footer>
    </div>
  );
};
