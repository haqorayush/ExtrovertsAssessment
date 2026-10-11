import React, { useState } from 'react';
import { Loader2, Sparkles, Check } from 'lucide-react';
import { VIBE_TAGS } from '../data/locations';

interface Step4ManifestoInviteProps {
  inviteCode: string;
  vibes: string[];
  onUpdate: (fields: { inviteCode?: string; vibes?: string[] }) => void;
  onSubmit: () => void;
  onBack: () => void;
  onErrorToast: (msg: string) => void;
}

export const Step4ManifestoInvite: React.FC<Step4ManifestoInviteProps> = ({
  inviteCode,
  vibes,
  onUpdate,
  onSubmit,
  onBack,
  onErrorToast,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteFeedback, setInviteFeedback] = useState('');

  const toggleVibe = (tag: string) => {
    let updated: string[];
    if (vibes.includes(tag)) {
      updated = vibes.filter((t) => t !== tag);
    } else {
      updated = [...vibes, tag];
    }
    onUpdate({ vibes: updated });
  };

  const handleInviteCodeChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    onUpdate({ inviteCode: clean });

    if (clean.length >= 4) {
      setInviteFeedback('✨ Valid invite code! +30 HVTs bonus will be unlocked.');
    } else {
      setInviteFeedback('');
    }
  };

  const handleSubmit = () => {
    if (vibes.length < 3) {
      onErrorToast('Please select at least 3 vibe tags to curate your party feed.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission latency to demonstrate loading spinner & prevent duplicate entries
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1200);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-transparent text-white">
      

      <main className="w-full max-w-[500px] mx-auto px-6 py-4 my-auto space-y-6">
        {/* Exact App Manifesto (Screenshots 4 & 9) */}
        <div className="space-y-1.5 font-poppins font-black text-sm sm:text-base tracking-wide leading-relaxed text-white select-none">
          <p>
            KINDNESS = GOOD <span className="text-[#8B5CF6]">HAIR</span> DAY
          </p>
          <p>
            SIP IN? <span className="text-[#8B5CF6]">CHIP</span> IN.
          </p>
          <p>
            GHOSTING IS FOR <span className="text-[#8B5CF6]">HALLOWEEN</span>.
          </p>
          <p>
            OUTFITS LOUD, <span className="text-[#8B5CF6]">INTENTIONS</span> CLEAR.
          </p>
          <p>
            JOINING? FREE. HOSTING? <span className="text-[#8B5CF6]">ALSO</span> FREE.
          </p>
          <p>
            EARLLY IS <span className="text-[#8B5CF6]">ICONIC</span>.
          </p>
          <p>
            YES. <span className="text-[#8B5CF6]">SPELLING</span> MISTAKE.
          </p>
        </div>

        {/* Invite Code Input (Screenshot 4 & 9) */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
            ENTER INVITE CODE (optional)
          </label>

          <div className="relative">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => handleInviteCodeChange(e.target.value)}
              placeholder="e.g. PARTY30"
              maxLength={10}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F0C1B] text-white placeholder-white/30 border border-white/20 text-sm font-semibold tracking-wider uppercase focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            />
          </div>

          <p className="text-xs text-white/60 leading-relaxed font-normal">
            Enter invite code and get up to +30 HVTs!
          </p>

          {inviteFeedback && (
            <p className="text-xs text-purple-300 font-semibold flex items-center gap-1.5 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              {inviteFeedback}
            </p>
          )}
        </div>

        {/* Vibe Selection Chips */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/80">
              PICK YOUR PARTY VIBES (MIN 3)
            </label>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-1 py-1 custom-scrollbar">
            {VIBE_TAGS.map((tag) => {
              const isSelected = vibes.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleVibe(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 border border-purple-400'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Stacked Buttons */}
      <footer className="w-full max-w-[500px] mx-auto px-6 pb-10 sm:pb-12 space-y-3">
        <button
          onClick={(e) => {
            if (isSubmitting || vibes.length < 3) {
              e.preventDefault();
              return;
            }
            handleSubmit();
          }}
          aria-disabled={isSubmitting || vibes.length < 3}
          type="button"
          data-primary="true"
          title={vibes.length < 3 ? `Please select at least 3 vibes to proceed (${vibes.length}/3 selected).` : undefined}
          className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
            vibes.length >= 3 && !isSubmitting
              ? 'bg-white text-black hover:bg-neutral-100 active:scale-[0.98]'
              : 'bg-white/30 text-white/40 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              CREATING PROFILE...
            </>
          ) : (
            'SIGN UP'
          )}
        </button>

        <button
          onClick={onBack}
          disabled={isSubmitting}
          type="button"
          className="w-full py-4 px-6 rounded-xl bg-black text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border border-white/80 hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          BACK
        </button>
      </footer>
    </div>
  );
};
