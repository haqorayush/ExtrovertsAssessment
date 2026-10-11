import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WizardStep, FormData, ToastNotification } from './types/wizard';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Step1AuthOtp } from './components/Step1AuthOtp';
import { Step2Identity } from './components/Step2Identity';
import { Step3LocationEdu } from './components/Step3LocationEdu';
import { Step4ManifestoInvite } from './components/Step4ManifestoInvite';
import { SuccessView } from './components/SuccessView';
import { VerticalProgress } from './components/VerticalProgress';
import { RightSidebarQuotes } from './components/RightSidebarQuotes';
import { ToastContainer } from './components/ui/Toast';
import { Header } from './components/Header';
import { PartyPopper } from 'lucide-react';

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const active = document.activeElement as HTMLElement;
        if (active.tagName === 'INPUT' || active.tagName === 'BODY') {
          const btn = document.querySelector('button[data-primary="true"]') as HTMLButtonElement;
          if (btn && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true') {
            e.preventDefault();
            btn.click();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [currentStep, setCurrentStep] = useState<WizardStep>('landing');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);


  const [showTermsModal, setShowTermsModal] = useState(false);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  // Form updates
  const updateFormData = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep('landing');
    setShowTermsModal(false);
    addToast('Wizard reset to beginning.', 'info');
  };



  const getStepNumber = () => {
    switch (currentStep) {
      case 'step1_auth': return 1;
      case 'step2_identity': return 2;
      case 'step3_location': return 3;
      case 'step4_manifesto': return 4;
      case 'login': return 1;
      case 'login_verify': return 2;
      default: return 0;
    }
  };

  const showHeader = ['step1_auth', 'step2_identity', 'step3_location', 'step4_manifesto', 'login', 'login_verify', 'success'].includes(currentStep);

  const getHeaderRightContent = () => {
    if (currentStep === 'success') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 shrink-0">
          <PartyPopper className="w-3 h-3" />
          Verified Extrovert
        </span>
      );
    }
    return undefined;
  };

  return (
    <div className="h-[100dvh] w-full bg-[#000000] text-white flex flex-col items-center justify-start relative font-poppins antialiased overflow-hidden">
      {/* Global Persistent Fluid Background - Aggressive overlapping mountains */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Top Left Mountain: Red/Orange/Pink */}
        <motion.div 
          className="absolute top-[-15%] left-[-15%] w-[120vw] h-[100vw] md:w-[75vw] md:h-[75vw] rounded-[45%_55%_70%_35%] bg-gradient-to-br from-[#881000] via-[#770022] to-[#660044] blur-[60px] opacity-90"
          animate={{ x: [0, 40, -10, 0], y: [0, 30, -20, 0], scale: [1, 1.15, 1.05, 1], rotate: [0, 15, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Top Right Mountain: Blue/Cyan */}
        <motion.div 
          className="absolute top-[-10%] right-[-15%] w-[110vw] h-[110vw] md:w-[70vw] md:h-[70vw] rounded-[35%_65%_40%_60%] bg-gradient-to-bl from-[#001188] via-[#003388] to-[#006688] blur-[50px] opacity-90"
          animate={{ x: [0, -40, 20, 0], y: [0, 50, -10, 0], scale: [1, 1.2, 1.1, 1], rotate: [0, -15, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Bottom Left Mountain: Pink/Purple */}
        <motion.div 
          className="absolute bottom-[-15%] left-[-10%] w-[90vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-[60%_40%_50%_50%] bg-gradient-to-tr from-[#660044] to-[#330088] blur-[50px] opacity-80"
          animate={{ x: [0, 20, -20, 0], y: [0, -30, 10, 0], scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Bottom Right Mountain: Orange/Yellow */}
        <motion.div 
          className="absolute bottom-[-10%] right-[-15%] w-[100vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-[40%_60%_50%_50%] bg-gradient-to-tl from-[#881000] to-[#884400] blur-[60px] opacity-70"
          animate={{ x: [0, -30, 20, 0], y: [0, -40, 15, 0], scale: [1, 1.15, 1], rotate: [0, 10, -5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Noise overlay */}
        <AnimatePresence>
          {currentStep !== 'landing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-3xl z-10"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay"></div>
      </div>

      {/* Global Toast Alerts */}
      <div className="relative z-[60]">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>

      {/* Main Responsive Web Container */}
      <div className="w-full flex-1 flex flex-col relative z-10">
        {showHeader && (
          <Header 
            showGettingReady={currentStep !== 'success'} 
            stepNumber={getStepNumber() || undefined} 
            totalSteps={currentStep === 'login' || currentStep === 'login_verify' ? 2 : 4} 
            onLogoClick={() => setCurrentStep('landing')}
            rightContent={getHeaderRightContent()}
          />
        )}
        
        <div className="flex-1 flex w-full relative h-full">
          <VerticalProgress 
            currentStep={currentStep} 
            onStepClick={setCurrentStep} 
            isLoginFlow={currentStep === 'login' || currentStep === 'login_verify'}
          />
          
          <div className="flex-1 relative flex flex-col min-h-0 w-full overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentStep === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
              <LandingPage
                onRegister={() => {
                  setFormData(prev => ({ ...prev, isLoginFlow: false }));
                  setShowTermsModal(true);
                }}
                onLogin={() => {
                  setFormData(prev => ({ ...prev, isLoginFlow: true }));
                  setShowTermsModal(true);
                }}
                onOpenTerms={() => setShowTermsModal(true)}
              />
            </motion.div>
          )}

          {currentStep === 'login' || currentStep === 'login_verify' ? (
            <motion.div key="login-flow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
              <LoginPage
                stage={currentStep}
                initialIdentifier={formData.identifier}
                initialOtp={formData.otp}
                onSendCode={() => setCurrentStep('login_verify')}
                onSuccess={() => setCurrentStep('success')}
                onBack={() => {
                  if (currentStep === 'login_verify') {
                    setCurrentStep('login');
                  } else {
                    setCurrentStep('landing');
                  }
                }}
                onErrorToast={(msg, type) => addToast(msg, type)}
              />
            </motion.div>
          ) : null}

          {currentStep === 'step1_auth' && (
            <motion.div key="step1_auth" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
              <Step1AuthOtp
                authType={formData.authType}
                identifier={formData.identifier}
                otp={formData.otp}
                onUpdate={updateFormData}
                onNext={() => setCurrentStep('step2_identity')}
                onBack={() => setCurrentStep('landing')}
                onErrorToast={addToast}
              />
            </motion.div>
          )}

          {currentStep === 'step2_identity' && (
            <motion.div key="step2_identity" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
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
            </motion.div>
          )}

          {currentStep === 'step3_location' && (
            <motion.div key="step3_location" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
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
            </motion.div>
          )}

          {currentStep === 'step4_manifesto' && (
            <motion.div key="step4_manifesto" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full flex-1 flex flex-col">
              <Step4ManifestoInvite
                inviteCode={formData.inviteCode}
                vibes={formData.vibes}
                onUpdate={updateFormData}
                onSubmit={() => setCurrentStep('success')}
                onBack={() => setCurrentStep('step3_location')}
                onErrorToast={addToast}
              />
            </motion.div>
          )}

          {currentStep === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full flex-1 flex flex-col">
              <SuccessView formData={formData} onReset={handleReset} addToast={addToast} />
            </motion.div>
          )}
            </AnimatePresence>
          </div>

          {/* Right Spacer to keep main content perfectly centered with the left sidebar */}
          {currentStep !== 'landing' && currentStep !== 'success' && (
            <RightSidebarQuotes />
          )}
        </div>
      </div>

      {/* Modal Overlay for Terms */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-fit max-w-[95vw] lg:max-w-[90vw] max-h-[90vh] overflow-hidden rounded-[2rem] bg-[#130F25] border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] flex flex-col relative"
              initial={{ scale: 0.95, y: 20 }}
              layout animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                <TermsAndConditions
                  onAccept={() => {
                    setShowTermsModal(false);
                    setCurrentStep(formData.isLoginFlow ? 'login' : 'step1_auth');
                  }}
                  onBack={() => setShowTermsModal(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}

export default App;
