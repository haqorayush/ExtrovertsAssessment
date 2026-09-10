import { useState } from 'react';
import type { WizardStep, FormData, ToastNotification } from './types/wizard';
import { LandingPage } from './components/LandingPage';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Step1AuthOtp } from './components/Step1AuthOtp';
import { Step2Identity } from './components/Step2Identity';
import { Step3LocationEdu } from './components/Step3LocationEdu';
import { Step4ManifestoInvite } from './components/Step4ManifestoInvite';
import { SuccessView } from './components/SuccessView';
import { ToastContainer } from './components/ui/Toast';
import { Sparkles, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

const INITIAL_FORM_DATA: FormData = {
  authType: 'email',
  identifier: '',
  otp: '',
  isVerified: false,
  username: '',
  fullName: '',
  age: '',
  pronouns: '',
  state: '',
  city: '',
  college: '',
  customCollege: '',
  graduationYear: '',
  inviteCode: '',
  vibes: [],
};

export function App() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('landing');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [showDevToolbar, setShowDevToolbar] = useState(false);

  // Toast system
  const addToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Form updates
  const updateFormData = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep('landing');
    addToast('Wizard reset to beginning.', 'info');
  };

  // Quick fill sample for fast testing
  const handleQuickFill = () => {
    setFormData({
      authType: 'email',
      identifier: 'ayush@extroverts.club',
      otp: '123456',
      isVerified: true,
      username: 'jellyfish',
      fullName: 'Gel-e-Phish',
      age: '22',
      pronouns: 'he/him/his',
      state: 'California',
      city: 'Los Angeles',
      college: 'University of California, Los Angeles (UCLA)',
      customCollege: '',
      graduationYear: '2026',
      inviteCode: 'VIPPARTY',
      vibes: ['House Party 🏠', 'Rooftop Sunset 🌅', 'Techno & Deep House 🎶'],
    });
    addToast('Sample profile data loaded! Navigate freely.', 'success');
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-white flex flex-col items-center justify-start relative font-poppins antialiased">
      {/* Global Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Main Responsive Web Container */}
      <div className="w-full flex-1 flex flex-col">
        {currentStep === 'landing' && (
          <LandingPage
            onContinue={() => setCurrentStep('terms')}
            onOpenTerms={() => setCurrentStep('terms')}
          />
        )}

        {currentStep === 'terms' && (
          <TermsAndConditions
            onAccept={() => setCurrentStep('step1_auth')}
            onBack={() => setCurrentStep('landing')}
          />
        )}

        {currentStep === 'step1_auth' && (
          <Step1AuthOtp
            authType={formData.authType}
            identifier={formData.identifier}
            otp={formData.otp}
            onUpdate={updateFormData}
            onNext={() => setCurrentStep('step2_identity')}
            onBack={() => setCurrentStep('terms')}
            onErrorToast={addToast}
          />
        )}

        {currentStep === 'step2_identity' && (
          <Step2Identity
            username={formData.username}
            fullName={formData.fullName}
            age={formData.age}
            pronouns={formData.pronouns}
            onUpdate={updateFormData}
            onNext={() => setCurrentStep('step3_location')}
            onBack={() => setCurrentStep('step1_auth')}
            onErrorToast={addToast}
          />
        )}

        {currentStep === 'step3_location' && (
          <Step3LocationEdu
            state={formData.state}
            city={formData.city}
            college={formData.college}
            customCollege={formData.customCollege}
            graduationYear={formData.graduationYear}
            onUpdate={updateFormData}
            onNext={() => setCurrentStep('step4_manifesto')}
            onBack={() => setCurrentStep('step2_identity')}
            onErrorToast={addToast}
          />
        )}

        {currentStep === 'step4_manifesto' && (
          <Step4ManifestoInvite
            inviteCode={formData.inviteCode}
            vibes={formData.vibes}
            onUpdate={updateFormData}
            onSubmit={() => setCurrentStep('success')}
            onBack={() => setCurrentStep('step3_location')}
            onErrorToast={addToast}
          />
        )}

        {currentStep === 'success' && (
          <SuccessView formData={formData} onReset={handleReset} />
        )}
      </div>

      {/* Floating Demo Toolbar for Evaluators & Video Recording */}
      <div className="fixed bottom-3 right-3 z-40">
        <div className="flex flex-col items-end">
          {showDevToolbar && (
            <div className="mb-2 p-3.5 rounded-2xl bg-[#130E26]/95 border border-purple-500/40 shadow-2xl backdrop-blur-md text-xs space-y-3 w-64 animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-purple-300 pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Evaluator Fast Travel
                </span>
              </div>

              {/* Jump buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setCurrentStep('landing')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'landing' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  1. Landing
                </button>
                <button
                  onClick={() => setCurrentStep('terms')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'terms' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  2. Terms
                </button>
                <button
                  onClick={() => setCurrentStep('step1_auth')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'step1_auth' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  3. Auth & OTP
                </button>
                <button
                  onClick={() => setCurrentStep('step2_identity')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'step2_identity' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  4. Identity/Age
                </button>
                <button
                  onClick={() => setCurrentStep('step3_location')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'step3_location' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  5. Location
                </button>
                <button
                  onClick={() => setCurrentStep('step4_manifesto')}
                  className={`px-2 py-1.5 rounded-lg font-semibold text-left transition-colors truncate ${
                    currentStep === 'step4_manifesto' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  6. Manifesto
                </button>
                <button
                  onClick={() => setCurrentStep('success')}
                  className={`col-span-2 px-2 py-1.5 rounded-lg font-semibold text-center transition-colors ${
                    currentStep === 'success' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  🎉 Success Screen
                </button>
              </div>

              {/* Fill Sample Data */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={handleQuickFill}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Pre-fill Sample Data
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowDevToolbar((prev) => !prev)}
            className="px-3 py-2 rounded-xl bg-black/80 hover:bg-purple-950 text-white/70 hover:text-white border border-white/20 shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Toggle Evaluator Fast Travel Navigation"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>Tester Menu</span>
            {showDevToolbar ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
