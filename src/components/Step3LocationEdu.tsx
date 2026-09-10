import React, { useState } from 'react';
import { MapPin, GraduationCap, Calendar, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import { LOCATION_DATA } from '../data/locations';

interface Step3LocationEduProps {
  state: string;
  city: string;
  college: string;
  customCollege: string;
  graduationYear: string;
  onUpdate: (fields: {
    state?: string;
    city?: string;
    college?: string;
    customCollege?: string;
    graduationYear?: string;
  }) => void;
  onNext: () => void;
  onBack: () => void;
  onErrorToast: (msg: string) => void;
}

export const Step3LocationEdu: React.FC<Step3LocationEduProps> = ({
  state,
  city,
  college,
  customCollege,
  graduationYear,
  onUpdate,
  onNext,
  onBack,
  onErrorToast,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get available cities for selected state
  const selectedStateObj = LOCATION_DATA.find((s) => s.name === state);
  const availableCities = selectedStateObj ? selectedStateObj.cities : [];

  // Get available colleges for selected city
  const selectedCityObj = availableCities.find((c) => c.name === city);
  const availableColleges = selectedCityObj ? selectedCityObj.colleges : [];

  // Cross-field State change
  const handleStateChange = (newState: string) => {
    onUpdate({
      state: newState,
      city: '', // Reset downstream
      college: '',
      customCollege: '',
    });
    if (errors.state) setErrors((prev) => ({ ...prev, state: '' }));
  };

  // Cross-field City change
  const handleCityChange = (newCity: string) => {
    onUpdate({
      city: newCity,
      college: '', // Reset downstream
      customCollege: '',
    });
    if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
  };

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    if (!state) newErrors.state = 'Please select your state/region.';
    if (!city) newErrors.city = 'Please select your city.';
    if (!college) newErrors.college = 'Please select your college/campus affiliation.';
    if (college === 'Other / Independent' && !customCollege.trim()) {
      newErrors.customCollege = 'Please enter your college name or affiliation.';
    }
    if (graduationYear) {
      const yr = parseInt(graduationYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(yr) || yr < currentYear - 10 || yr > currentYear + 8) {
        newErrors.graduationYear = `Year must be between ${currentYear - 10} and ${currentYear + 8}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      onErrorToast('Please resolve the highlighted location fields.');
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white">
      <Header showGettingReady={true} stepNumber={3} totalSteps={4} onLogoClick={onBack} />

      <main className="w-full max-w-md mx-auto px-6 py-6 my-auto space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins">
            Where do you party and study?
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-medium">
            Events and party invites are curated based on your city and university network.
          </p>
        </div>

        <div className="space-y-4">
          {/* Field 1: State */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/80 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              STATE / REGION
            </label>
            <select
              value={state}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white border border-white/20 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            >
              <option value="" className="bg-[#0F0C1B] text-white/50">
                Select State
              </option>
              {LOCATION_DATA.map((s) => (
                <option key={s.name} value={s.name} className="bg-[#0F0C1B] text-white">
                  {s.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.state}
              </p>
            )}
          </div>

          {/* Field 2: City (Cascading from State) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
              CITY
            </label>
            <select
              disabled={!state}
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white border text-sm font-medium focus:outline-none ${
                !state
                  ? 'border-white/10 text-white/30 cursor-not-allowed bg-[#0a0814]'
                  : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
              }`}
            >
              <option value="" className="bg-[#0F0C1B] text-white/50">
                {!state ? 'Select a state first' : 'Select City'}
              </option>
              {availableCities.map((c) => (
                <option key={c.name} value={c.name} className="bg-[#0F0C1B] text-white">
                  {c.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </p>
            )}
          </div>

          {/* Field 3: College / Campus (Cascading from City) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/80 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              COLLEGE / CAMPUS
            </label>
            <select
              disabled={!city}
              value={college}
              onChange={(e) => {
                onUpdate({ college: e.target.value });
                if (errors.college) setErrors((prev) => ({ ...prev, college: '' }));
              }}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white border text-sm font-medium focus:outline-none ${
                !city
                  ? 'border-white/10 text-white/30 cursor-not-allowed bg-[#0a0814]'
                  : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30'
              }`}
            >
              <option value="" className="bg-[#0F0C1B] text-white/50">
                {!city ? 'Select a city first' : 'Select College / Campus'}
              </option>
              {availableColleges.map((col) => (
                <option key={col} value={col} className="bg-[#0F0C1B] text-white">
                  {col}
                </option>
              ))}
            </select>
            {errors.college && (
              <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.college}
              </p>
            )}
          </div>

          {/* Custom college input if Other selected */}
          {college === 'Other / Independent' && (
            <div className="space-y-1.5 pt-1 animate-fadeIn">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
                ENTER INSTITUTION OR WORKPLACE NAME
              </label>
              <input
                type="text"
                value={customCollege}
                onChange={(e) => {
                  onUpdate({ customCollege: e.target.value });
                  if (errors.customCollege) setErrors((prev) => ({ ...prev, customCollege: '' }));
                }}
                placeholder="e.g. Design Academy or Freelance"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border border-white/20 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30"
              />
              {errors.customCollege && (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.customCollege}
                </p>
              )}
            </div>
          )}

          {/* Field 4: Graduation Year (numeric only) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/80 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              GRADUATION YEAR (OPTIONAL)
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={graduationYear}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, '');
                onUpdate({ graduationYear: numeric });
                if (errors.graduationYear) setErrors((prev) => ({ ...prev, graduationYear: '' }));
              }}
              placeholder="e.g. 2026"
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border border-white/20 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            />
            {errors.graduationYear && (
              <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.graduationYear}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Stacked Buttons */}
      <footer className="w-full max-w-md mx-auto px-6 pb-10 sm:pb-12 space-y-3">
        <button
          onClick={handleNext}
          disabled={!state || !city || !college}
          type="button"
          className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 ${
            state && city && college
              ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
              : 'bg-white/30 text-white/40 cursor-not-allowed'
          }`}
        >
          NEXT
        </button>

        <button
          onClick={onBack}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border border-white/80 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          BACK
        </button>
      </footer>
    </div>
  );
};
