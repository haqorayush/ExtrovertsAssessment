import React, { useState, useEffect, useRef } from 'react';
import { MapPin, GraduationCap, Calendar, AlertCircle, ChevronDown } from 'lucide-react';
import { LOCATION_DATA } from '../data/locations';

interface CustomDropdownProps {
  label: string;
  icon?: React.ElementType;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  disabled?: boolean;
  error?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, icon: Icon, options, value, onChange, placeholder, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5" ref={dropdownRef}>
      <label className="block text-xs font-bold uppercase tracking-widest text-white/80 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-purple-400" />}
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white border text-sm font-medium focus:outline-none flex justify-between items-center ${
            disabled
              ? 'border-white/10 text-white/30 cursor-not-allowed bg-[#0a0814]'
              : 'border-white/20 focus:border-white focus:ring-2 focus:ring-white/30 hover:bg-[#151125]'
          }`}
        >
          <span className={!value ? 'text-white/50' : ''}>{value || placeholder}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 py-2 bg-[#151125] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors ${
                  value === opt ? 'bg-white/5 text-purple-400 font-bold' : 'text-white/90'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

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
    <div className="w-full flex-1 flex flex-col justify-between bg-transparent text-white">
      

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
          <CustomDropdown
            label="STATE / REGION"
            icon={MapPin}
            options={LOCATION_DATA.map((s) => s.name)}
            value={state}
            onChange={handleStateChange}
            placeholder="Select State"
            error={errors.state}
          />

          {/* Field 2: City (Cascading from State) */}
          <CustomDropdown
            label="CITY"
            options={availableCities.map((c) => c.name)}
            value={city}
            onChange={handleCityChange}
            placeholder={!state ? 'Select a state first' : 'Select City'}
            disabled={!state}
            error={errors.city}
          />

          {/* Field 3: College / Campus (Cascading from City) */}
          <CustomDropdown
            label="COLLEGE / CAMPUS"
            icon={GraduationCap}
            options={availableColleges}
            value={college}
            onChange={(val) => {
              onUpdate({ college: val });
              if (errors.college) setErrors((prev) => ({ ...prev, college: '' }));
            }}
            placeholder={!city ? 'Select a city first' : 'Select College / Campus'}
            disabled={!city}
            error={errors.college}
          />

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
          onClick={(e) => {
            if (!state || !city || !college) {
              e.preventDefault();
              return;
            }
            handleNext();
          }}
          aria-disabled={!state || !city || !college}
          type="button"
          data-primary="true"
          title={
            !state ? "Please select a state to proceed." :
            !city ? "Please select a city to proceed." :
            !college ? "Please select a college/campus to proceed." :
            undefined
          }
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
