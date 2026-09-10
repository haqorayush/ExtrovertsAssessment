import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Logo } from './ui/Logo';
import { Sparkles, MapPin, GraduationCap, PartyPopper, RotateCcw, Share2, Award } from 'lucide-react';
import type { FormData } from '../types/wizard';

interface SuccessViewProps {
  formData: FormData;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ formData, onReset }) => {
  useEffect(() => {
    // Multi-burst confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#A855F7', '#EC4899', '#3B82F6', '#F59E0B'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#A855F7', '#EC4899', '#3B82F6', '#F59E0B'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white px-6 md:px-8 py-8">
      {/* Top Header */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between">
        <Logo size="md" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
          <PartyPopper className="w-3.5 h-3.5" />
          Verified Extrovert
        </span>
      </div>

      {/* Main VIP Pass Card */}
      <main className="w-full max-w-md mx-auto my-auto py-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-600/20 text-purple-400 mb-1 border border-purple-500/30">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white font-poppins">
            You're on the Guest List!
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-medium">
            Welcome to the community. Here is your official Extroverts Party Pass.
          </p>
        </div>

        {/* Digital Member Card */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#1C1438] via-[#0E0A1E] to-[#0A0714] border border-purple-500/40 shadow-2xl overflow-hidden space-y-5">
          {/* Holographic background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-xs font-black tracking-widest text-white/80 uppercase">
                VIP MEMBER PASS
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Award className="w-3 h-3" />
              +30 HVTs
            </div>
          </div>

          {/* User Details */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white tracking-tight">
                {formData.fullName || 'Extrovert Guest'}
              </h3>
              <span className="text-xs text-purple-400 font-bold">
                {formData.pronouns || 'they/them'}
              </span>
            </div>

            <p className="text-sm font-bold text-white/70">
              @{formData.username || 'party_vibe'}
              <span className="mx-2 text-white/30">•</span>
              <span className="text-white/60 font-medium">{formData.age || '21'} Years Young</span>
            </p>
          </div>

          {/* Campus & Location */}
          <div className="relative z-10 grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-400" />
                CITY
              </span>
              <p className="font-bold text-white truncate">
                {formData.city || 'Los Angeles'}, {formData.state || 'CA'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-purple-400" />
                CAMPUS
              </span>
              <p className="font-bold text-white truncate">
                {formData.college === 'Other / Independent'
                  ? formData.customCollege || 'Independent'
                  : formData.college || 'Campus'}
              </p>
            </div>
          </div>

          {/* Selected Vibes Chips */}
          <div className="relative z-10 pt-2 space-y-1.5">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">
              PARTY VIBES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {formData.vibes.length > 0 ? (
                formData.vibes.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-[11px] font-bold text-purple-200"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/40 italic">House Party & Rooftop</span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Area */}
      <footer className="w-full max-w-md mx-auto space-y-3 pb-4">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            alert('Guest profile link copied to clipboard!');
          }}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-white text-black font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          SHARE GUEST PASS
        </button>

        <button
          onClick={onReset}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border border-white/80 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          RESTART WIZARD DEMO
        </button>
      </footer>
    </div>
  );
};
