import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Loader2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Header } from './Header';

interface Step1AuthOtpProps {
  authType: 'email' | 'phone';
  identifier: string;
  otp: string;
  onUpdate: (fields: { authType?: 'email' | 'phone'; identifier?: string; otp?: string; isVerified?: boolean }) => void;
  onNext: () => void;
  onBack: () => void;
  onErrorToast: (msg: string) => void;
}

export const Step1AuthOtp: React.FC<Step1AuthOtpProps> = ({
  authType,
  identifier,
  otp,
  onUpdate,
  onNext,
  onBack,
  onErrorToast,
}) => {
  const [stage, setStage] = useState<'input' | 'otp'>(otp ? 'otp' : 'input');
  const [localAuthType, setLocalAuthType] = useState<'email' | 'phone'>(authType || 'email');
  const [localIdentifier, setLocalIdentifier] = useState(identifier || '');
  const [inputError, setInputError] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // OTP 6-box state
  const [otpDigits, setOtpDigits] = useState<string[]>(() => {
    if (otp && otp.length === 6) {
      return otp.split('');
    }
    return ['', '', '', '', '', ''];
  });
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isShake, setIsShake] = useState(false);
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (stage === 'otp' && resendTimer > 0) {
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
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address (e.g. name@party.com).';
      }
    } else {
      const phoneClean = trimmed.replace(/\D/g, '');
      if (phoneClean.length < 10 || phoneClean.length > 13) {
        return 'Phone number must be at least 10 digits.';
      }
    }
    return '';
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalIdentifier(val);
    if (inputError) {
      setInputError(validateIdentifier(val, localAuthType));
    }
  };

  const handleSendCode = () => {
    const err = validateIdentifier(localIdentifier, localAuthType);
    if (err) {
      setInputError(err);
      onErrorToast(err);
      return;
    }

    setIsSendingCode(true);
    onUpdate({ authType: localAuthType, identifier: localIdentifier });

    // Simulate API request
    setTimeout(() => {
      setIsSendingCode(false);
      setStage('otp');
      setResendTimer(30);
      setOtpError('');
      // Focus first OTP input
      setTimeout(() => {
        digitInputRefs.current[0]?.focus();
      }, 150);
    }, 900);
  };

  // Handle OTP digit changes
  const handleDigitChange = (index: number, val: string) => {
    // Only accept numeric
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal && val !== '') return;

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1); // Take last typed char
    setOtpDigits(newDigits);
    setOtpError('');

    const fullCode = newDigits.join('');
    onUpdate({ otp: fullCode });

    // Auto-advance to next input
    if (cleanVal && index < 5) {
      digitInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      // If current box is empty, move focus back to previous and clear it
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
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      onUpdate({ otp: pasted });
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

    // Mock verification: "123456" is standard test code, or allow any code for testing if not 000000
    setTimeout(() => {
      setIsVerifying(false);
      if (fullCode === '000000' || fullCode === '999999') {
        setOtpError('Invalid verification code. Please enter 123456 for demo.');
        setIsShake(true);
        setTimeout(() => setIsShake(false), 500);
        onErrorToast('Incorrect verification code. Try demo code 123456');
      } else {
        // Success
        onUpdate({ isVerified: true, otp: fullCode });
        onNext();
      }
    }, 800);
  };

  const handleAutoFillDemo = () => {
    const demoCode = ['1', '2', '3', '4', '5', '6'];
    setOtpDigits(demoCode);
    setOtpError('');
    onUpdate({ otp: '123456' });
    digitInputRefs.current[5]?.focus();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white">
      <Header showGettingReady={true} stepNumber={1} totalSteps={4} onLogoClick={onBack} />

      <main className="w-full max-w-md mx-auto px-6 py-6 my-auto">
        {stage === 'input' ? (
          /* Sub-step 1A: Email / Phone input */
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
                First things first, verify yourself!
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                We'll send you a single-use verification code to secure your VIP party invite.
              </p>
            </div>

            {/* Switch between Email and Phone */}
            <div className="flex rounded-xl bg-[#141026] p-1 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setLocalAuthType('email');
                  setInputError('');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  localAuthType === 'email'
                    ? 'bg-white text-black shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocalAuthType('phone');
                  setInputError('');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  localAuthType === 'phone'
                    ? 'bg-white text-black shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Phone
              </button>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                {localAuthType === 'email' ? 'EMAIL ADDRESS' : 'MOBILE PHONE'}
              </label>

              <div className="relative">
                <input
                  type={localAuthType === 'email' ? 'email' : 'tel'}
                  value={localIdentifier}
                  onChange={handleIdentifierChange}
                  onBlur={() => setInputError(validateIdentifier(localIdentifier, localAuthType))}
                  placeholder={
                    localAuthType === 'email' ? 'e.g. partyanimal@vibe.com' : 'e.g. 9876543210'
                  }
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#120D24] text-white placeholder-white/30 border transition-all text-sm font-medium focus:outline-none ${
                    inputError
                      ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/40'
                      : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/20'
                  }`}
                />
              </div>

              {inputError ? (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {inputError}
                </p>
              ) : (
                <p className="text-xs text-white/50 font-normal">
                  Standard carrier message & data rates may apply.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Sub-step 1B: Reimagined Modern OTP UI */
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-900/40 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3 h-3 text-purple-300" />
                Enhanced OTP Experience
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
                Enter the 6-digit code
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Sent to{' '}
                <span className="text-white font-semibold underline underline-offset-2">
                  {localIdentifier || 'your account'}
                </span>
                .{' '}
                <button
                  type="button"
                  onClick={() => setStage('input')}
                  className="text-purple-400 hover:text-purple-300 font-semibold text-xs ml-1"
                >
                  Edit
                </button>
              </p>
            </div>

            {/* 6 Digit Segmented Inputs */}
            <div className={`space-y-3 ${isShake ? 'animate-shake' : ''}`}>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                SECURITY VERIFICATION CODE
              </label>

              <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      digitInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-black rounded-xl bg-[#140F2A] border transition-all focus:outline-none ${
                      otpError
                        ? 'border-red-500 text-red-300 focus:ring-2 focus:ring-red-500/40'
                        : digit
                        ? 'border-purple-400 text-white bg-purple-950/30'
                        : 'border-white/20 text-white focus:border-white focus:ring-2 focus:ring-white/30'
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

            {/* Countdown / Resend & Auto-fill demo helper */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
              {resendTimer > 0 ? (
                <span className="text-white/60 font-medium">
                  Resend code in <strong className="text-white font-mono">{resendTimer}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setResendTimer(30);
                    onErrorToast('New verification code sent to ' + localIdentifier);
                  }}
                  className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend Code
                </button>
              )}

              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-xs font-semibold tracking-wide border border-white/10 transition-colors flex items-center gap-1.5"
                title="Auto fill test code: 123456"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Fill Demo Code (123456)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Stacked Buttons (Pixel-parity with app) */}
      <footer className="w-full max-w-md mx-auto px-6 pb-10 sm:pb-12 space-y-3">
        {stage === 'input' ? (
          <button
            onClick={handleSendCode}
            disabled={isSendingCode || !localIdentifier.trim()}
            type="button"
            className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              localIdentifier.trim() && !isSendingCode
                ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
                : 'bg-white/30 text-white/40 cursor-not-allowed'
            }`}
          >
            {isSendingCode ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                SENDING CODE...
              </>
            ) : (
              'SEND CODE'
            )}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={isVerifying || otpDigits.join('').length < 6}
            type="button"
            className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              otpDigits.join('').length === 6 && !isVerifying
                ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
                : 'bg-white/30 text-white/40 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                VERIFYING...
              </>
            ) : (
              'NEXT'
            )}
          </button>
        )}

        <button
          onClick={() => {
            if (stage === 'otp') {
              setStage('input');
            } else {
              onBack();
            }
          }}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border border-white/80 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          BACK
        </button>
      </footer>
    </div>
  );
};
