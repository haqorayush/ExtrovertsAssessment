import { useState } from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import type { Step2SubStep } from '../types/wizard';

interface Step2IdentityProps {
  username: string;
  fullName: string;
  age: string;
  pronouns: string;
  onUpdate: (fields: { username?: string; fullName?: string; age?: string; pronouns?: string }) => void;
  onNext: () => void;
  onBack: () => void;
  onErrorToast: (msg: string) => void;
}

export const Step2Identity: React.FC<Step2IdentityProps> = ({
  username,
  fullName,
  age,
  pronouns,
  onUpdate,
  onNext,
  onBack,
  onErrorToast,
}) => {
  const [subStep, setSubStep] = useState<Step2SubStep>('username');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Common pronouns quick options
  const pronounOptions = ['he/him/his', 'she/her/hers', 'they/them/theirs'];

  // Validation routines
  const validateUsername = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Username is required.';
    if (trimmed.length < 3) return 'Username must be at least 3 characters.';
    if (trimmed.length > 20) return 'Username cannot exceed 20 characters.';
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return 'Username can only contain letters, numbers, and underscores.';
    }
    return '';
  };

  const validateName = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Name cannot be blank or whitespace-only.';
    if (trimmed.length < 2) return 'Name must be at least 2 characters.';
    if (trimmed.length > 50) return 'Name cannot exceed 50 characters.';
    return '';
  };

  const validateAge = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Please enter your age.';
    const num = parseInt(trimmed, 10);
    if (isNaN(num)) return 'Age must be a numeric value.';
    if (num < 1) return 'Please enter a realistic age.';
    if (num < 18) {
      return 'Extroverts is strictly for users 18 and older. You must be at least 18 to join.';
    }
    if (num > 100) return 'Please enter a valid age under 100.';
    return '';
  };

  const validatePronouns = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Please select or enter your pronouns.';
    return '';
  };

  // Step 2 sub-navigation handlers
  const handleNextSubStep = () => {
    if (subStep === 'username') {
      const err = validateUsername(username);
      if (err) {
        setErrors({ username: err });
        onErrorToast(err);
        return;
      }
      setErrors({});
      setSubStep('name');
    } else if (subStep === 'name') {
      const err = validateName(fullName);
      if (err) {
        setErrors({ fullName: err });
        onErrorToast(err);
        return;
      }
      setErrors({});
      setSubStep('age');
    } else if (subStep === 'age') {
      const err = validateAge(age);
      if (err) {
        setErrors({ age: err });
        onErrorToast(err);
        return;
      }
      setErrors({});
      setSubStep('pronouns');
    } else if (subStep === 'pronouns') {
      const err = validatePronouns(pronouns);
      if (err) {
        setErrors({ pronouns: err });
        onErrorToast(err);
        return;
      }
      setErrors({});
      onNext(); // Advance to Step 3 (Location & College)
    }
  };

  const handleBackSubStep = () => {
    setErrors({});
    if (subStep === 'pronouns') {
      setSubStep('age');
    } else if (subStep === 'age') {
      setSubStep('name');
    } else if (subStep === 'name') {
      setSubStep('username');
    } else {
      onBack(); // Return to Step 1 (OTP)
    }
  };

  // Check if age input is currently under 18
  const parsedAge = parseInt(age, 10);
  const isUnderage = !isNaN(parsedAge) && parsedAge > 0 && parsedAge < 18;

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-transparent text-white">
      

      <main className="w-full max-w-md mx-auto px-6 py-4 my-auto overflow-y-auto custom-scrollbar">
        {/* SUBSTEP 2A: USERNAME (Screenshots 3 & 5) */}
        {subStep === 'username' && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
              Create a username that fits your vibe!
            </h2>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                USERNAME
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    const clean = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                    onUpdate({ username: clean });
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  placeholder="e.g. jellyfish"
                  maxLength={20}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border transition-all text-sm font-medium focus:outline-none ${
                    errors.username
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
                      : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
                  }`}
                />
              </div>

              {errors.username ? (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.username}
                </p>
              ) : (
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  All your Superlatives and Invites will come your way with this name, so make it unforgettable!
                </p>
              )}
            </div>
          </div>
        )}

        {/* SUBSTEP 2B: NAME (Screenshot 6) */}
        {subStep === 'name' && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
              "Name, please, for the party check!"
            </h2>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                NAME
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    onUpdate({ fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="e.g. Gel-e-Phish"
                  maxLength={50}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border transition-all text-sm font-medium focus:outline-none ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
                      : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
                  }`}
                />
              </div>

              {errors.fullName ? (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.fullName}
                </p>
              ) : (
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  This is the name shown as on members and requests. Cannot be changed later.
                </p>
              )}
            </div>
          </div>
        )}

        {/* SUBSTEP 2C: AGE (Screenshot 7 + Explicit Prompt Fix for < 18) */}
        {subStep === 'age' && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
              How many years have you been partying?
            </h2>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                AGE
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => {
                    const numericVal = e.target.value.replace(/\D/g, '').slice(0, 3);
                    onUpdate({ age: numericVal });
                    if (errors.age) setErrors({ ...errors, age: '' });
                  }}
                  placeholder="e.g. 21"
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border transition-all text-sm font-medium focus:outline-none ${
                    isUnderage || errors.age
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
                      : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
                  }`}
                />
              </div>

              {/* CRITICAL EVALUATION CRITERIA: Under-18 prompt improvement */}
              {isUnderage && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5 text-red-300">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    Age Eligibility Requirement (18+)
                  </div>
                  <p className="leading-relaxed">
                    Extroverts connects adults for nightlife and party events. You must be at least 18 years old to join.
                  </p>
                </div>
              )}

              {errors.age && !isUnderage && (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.age}
                </p>
              )}

              {!isUnderage && !errors.age && (
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  We need your age to verify you're eligible and help others know who they're connecting with.
                </p>
              )}
            </div>
          </div>
        )}

        {/* SUBSTEP 2D: PRONOUNS (Screenshot 8) */}
        {subStep === 'pronouns' && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
              Which pronouns feel right for you?
            </h2>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                PRONOUNS
              </label>

              {/* Quick interactive pills */}
              <div className="flex flex-wrap gap-2">
                {pronounOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onUpdate({ pronouns: opt });
                      if (errors.pronouns) setErrors({ ...errors, pronouns: '' });
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      pronouns === opt
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400'
                        : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="relative pt-1">
                <input
                  type="text"
                  value={pronouns}
                  onChange={(e) => {
                    onUpdate({ pronouns: e.target.value });
                    if (errors.pronouns) setErrors({ ...errors, pronouns: '' });
                  }}
                  placeholder="Or enter custom (e.g. he/they)"
                  maxLength={30}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border transition-all text-sm font-medium focus:outline-none ${
                    errors.pronouns
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
                      : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
                  }`}
                />
              </div>

              {errors.pronouns ? (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.pronouns}
                </p>
              ) : (
                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  Select the pronouns that feel right for you.
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Stacked Buttons */}
      <footer className="w-full max-w-md mx-auto px-6 pb-10 sm:pb-12 space-y-3">
        <button
          onClick={(e) => {
            const isDisabled = (subStep === 'username' && !username.trim()) ||
                               (subStep === 'name' && !fullName.trim()) ||
                               (subStep === 'age' && (!age.trim() || isUnderage)) ||
                               (subStep === 'pronouns' && !pronouns.trim());
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            handleNextSubStep();
          }}
          aria-disabled={
            (subStep === 'username' && !username.trim()) ||
            (subStep === 'name' && !fullName.trim()) ||
            (subStep === 'age' && (!age.trim() || isUnderage)) ||
            (subStep === 'pronouns' && !pronouns.trim())
          }
          type="button"
          data-primary="true"
          title={
            (subStep === 'username' && !username.trim()) ? 'Please choose a username to proceed.' :
            (subStep === 'name' && !fullName.trim()) ? 'Please enter your full name to proceed.' :
            (subStep === 'age' && !age.trim()) ? 'Please enter your age to proceed.' :
            (subStep === 'age' && isUnderage) ? 'You must be at least 18 years old to proceed.' :
            (subStep === 'pronouns' && !pronouns.trim()) ? 'Please select your pronouns to proceed.' :
            undefined
          }
          className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 ${
            (subStep === 'username' && username.trim()) ||
            (subStep === 'name' && fullName.trim()) ||
            (subStep === 'age' && age.trim() && !isUnderage) ||
            (subStep === 'pronouns' && pronouns.trim())
              ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
              : 'bg-white/30 text-white/40 cursor-not-allowed'
          }`}
        >
          NEXT
        </button>

        <button
          onClick={handleBackSubStep}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border border-white/80 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          BACK
        </button>
      </footer>
    </div>
  );
};
