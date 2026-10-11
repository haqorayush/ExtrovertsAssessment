import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Logo } from './ui/Logo';

import { Sparkles, MapPin, GraduationCap, Share2, Award, Flame, Ticket, ArrowRight, Plus, Star, User, LogOut } from 'lucide-react';
import type { FormData } from '../types/wizard';

interface SuccessViewProps {
  formData: FormData;
  onReset: () => void;
  addToast: (msg: string, type: 'success' | 'error') => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ formData, onReset, addToast }) => {
  const getInitials = (name: string) => {
    if (!name) return 'EG';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
    <div className="w-full flex-1 flex flex-col bg-transparent text-white relative z-10">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pb-8 pt-2 flex flex-col xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-8 items-center xl:items-start">
        
        {/* Main Modal - Centered in grid */}
        <main className="w-full max-w-4xl mx-auto xl:col-start-2 px-6 md:px-8 py-6 md:py-8 space-y-6 bg-transparent shrink-0">
          
          {/* Welcome Text */}
          <div className="text-center space-y-1.5 mb-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-600/20 text-purple-400 mb-2 border border-purple-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-poppins">
              You're on the Guest List!
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-medium">
              Welcome to the community. Here is your official Extroverts Party Pass.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            
            {/* Left Column: Card, Stats, Passes */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* VIP PASS CARD */}
              <div className="relative rounded-[1.25rem] p-5 bg-gradient-to-br from-[#1E1536] to-[#0F0A1E] border border-purple-500/20 space-y-4">
                {/* Card Top */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Logo size="sm" />
                    <span className="text-xs font-black tracking-widest text-white/80 uppercase">
                      VIP MEMBER PASS
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">
                    <Award className="w-3.5 h-3.5" />
                    +{formData.isLoginFlow ? '0' : '30'} HVTs
                  </div>
                </div>

                {/* User Details */}
                <div className="relative z-10 flex items-center gap-4">
                  {/* Avatar block matching text height (w-14 h-14 is 56px, ideal for 2 lines of text) */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 border border-purple-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {formData.profilePicture ? (
                      <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-black text-fuchsia-400 tracking-wider">
                        {getInitials(formData.fullName || 'Extrovert Guest')}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-2xl font-black text-white tracking-tight truncate pr-2">
                        {formData.fullName || 'Extrovert Guest'}
                      </h3>
                      <span className="text-xs text-fuchsia-400 font-bold shrink-0">
                        {formData.pronouns || 'they/them'}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white/60 truncate">
                      @{formData.username || 'party_vibe'}
                      <span className="mx-2 text-white/20">•</span>
                      <span className="text-white/50 font-medium">{formData.age || '21'} Years Young</span>
                    </p>
                  </div>
                </div>

                {/* Campus & Location */}
                <div className="relative z-10 grid grid-cols-2 gap-2 pt-1 text-sm">
                  <div className="p-3 rounded-xl bg-[#181329] border border-white/5 space-y-1">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-fuchsia-400" />
                      CITY
                    </span>
                    <p className="font-bold text-white truncate text-xs">
                      {formData.city || 'Los Angeles'}, {formData.state || 'CA'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#181329] border border-white/5 space-y-1">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-fuchsia-400" />
                      CAMPUS
                    </span>
                    <p className="font-bold text-white truncate text-xs">
                      {formData.college === 'Other / Independent'
                        ? formData.customCollege || 'Independent'
                        : formData.college || 'Campus'}
                    </p>
                  </div>
                </div>

                {/* Selected Vibes Chips */}
                <div className="relative z-10 pt-1 space-y-1.5">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                    PARTY VIBES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formData.vibes.length > 0 ? (
                      formData.vibes.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-purple-900/30 border border-purple-500/20 text-xs font-bold text-purple-200"
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

              {/* Stats Row */}
              <div className="grid grid-cols-3 divide-x divide-white/5 py-5 bg-[#120E18] rounded-[1.25rem] border border-white/5">
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-2xl font-black text-white">0</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Events</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-2xl font-black text-white">0</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Superlatives</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-2xl font-black text-white">{formData.isLoginFlow ? '0' : '30'}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">HVTs</span>
                </div>
              </div>

              {/* Passes Section */}
              <div className="flex flex-col gap-2.5 mt-2">
                <h2 className="text-xs text-[#D946EF] font-black uppercase tracking-widest">Passes</h2>
                <div className="flex flex-col gap-2.5">
                  <button className="w-full rounded-[1rem] border border-orange-500/20 p-4 flex items-center justify-between bg-[#130E1A] hover:bg-white/5 transition-all group">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">VIP</div>
                        <span className="font-black text-sm text-white group-hover:text-orange-400 transition-colors">VIP Passes</span>
                      </div>
                      <span className="text-xs text-white/50 pl-[38px] text-left">Skip the line at any event</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-orange-400" />
                    </div>
                  </button>

                  <button className="w-full rounded-[1rem] border border-cyan-500/20 p-4 flex items-center justify-between bg-[#130E1A] hover:bg-white/5 transition-all group">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black p-0.5 rounded"><Ticket className="w-4 h-4" /></div>
                        <span className="font-black text-sm text-white group-hover:text-cyan-400 transition-colors">Invite Passes</span>
                      </div>
                      <span className="text-xs text-white/50 pl-[28px] text-left">You have <strong className="text-cyan-400">{formData.inviteCode ? '3' : '0'}</strong> invite passes</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-cyan-400" />
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Club, Superlatives, Memories, Spotlight */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Club Section */}
              <div className="flex flex-col gap-2.5">
                <h2 className="text-xs text-[#D946EF] font-black uppercase tracking-widest">Club Status</h2>
                <div className="w-full border border-orange-500/20 rounded-xl p-4 flex items-center justify-between bg-[#130E1A]">
                  <span className="font-black text-base text-[#F59E0B]">Bronze Club Member</span>
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-600 rounded rotate-45 flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-[#451A03]/50 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                    <span className="text-white">{formData.username ? formData.username.toUpperCase() : 'GEL-E-PHISH'}</span> HAS {formData.isLoginFlow ? '0' : '30'} HONORARY VIBE TOKENS!
                  </span>
                </div>
              </div>

              {/* Superlatives Section */}
              <div className="flex flex-col gap-2.5">
                <h2 className="text-xs text-[#D946EF] font-black uppercase tracking-widest">Superlatives</h2>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="aspect-square rounded-xl bg-[#130E1A] border border-white/5 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-white/20" />
                  </div>
                  <div className="aspect-square rounded-xl bg-[#130E1A] border border-white/5 flex items-center justify-center">
                    <Ticket className="w-8 h-8 text-white/20" />
                  </div>
                  <button className="aspect-square rounded-xl bg-[#130E1A] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors group">
                    <ArrowRight className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                  </button>
                </div>
                <span className="text-xs text-white/40 font-medium">No Superlatives awarded to you yet</span>
              </div>

              {/* Memories Section */}
              <div className="flex flex-col gap-2.5">
                <h2 className="text-xs text-[#D946EF] font-black uppercase tracking-widest">Memories</h2>
                <div className="grid grid-cols-2 gap-2.5 h-[120px]">
                  <div className="rounded-[1.25rem] bg-gradient-to-bl from-[#9CA371] via-[#F4405D] to-[#1F0018] p-4 flex flex-col justify-between">
                    <span className="font-extrabold text-sm leading-tight text-white">Memories<br/>show here</span>
                    <span className="font-black text-white tracking-widest text-2xl">...</span>
                  </div>
                  <button className="rounded-[1.25rem] border border-dashed border-white/20 bg-transparent flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all group">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                      <Plus className="w-4 h-4 text-white/60 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white/60 group-hover:text-white uppercase tracking-widest">Create Event</span>
                  </button>
                </div>
              </div>
              
              {/* Spotlight for Business */}
              <div className="flex flex-col gap-2.5 mt-2">
                <h2 className="text-xs text-[#D946EF] font-black uppercase tracking-widest">Spotlight for Business</h2>
                <div className="w-full flex flex-col gap-2">
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-extrabold text-sm tracking-widest uppercase shadow-lg hover:opacity-90 active:scale-[0.98] transition-all text-white">
                    Extroverts Spotlight
                  </button>
                  <p className="text-xs text-white/50 leading-relaxed font-medium">
                    Own a party place in your city? Get it featured turn your party spot into the city hotspot!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* Action Buttons - Right Column */}
        <div className="w-full xl:col-start-3 xl:self-center flex flex-col md:flex-row xl:flex-col gap-3 mt-8 xl:mt-0 pb-12 xl:pb-0 shrink-0">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              addToast('Guest profile link copied to clipboard!', 'success');
            }}
            type="button"
            className="flex-1 xl:flex-none py-4 px-6 rounded-xl bg-white text-black font-extrabold text-sm tracking-wider uppercase hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            SHARE PASS
          </button>

          <button
            type="button"
            className="flex-1 xl:flex-none py-4 px-6 rounded-xl bg-[#1B1622] text-white font-extrabold text-sm tracking-wider uppercase border border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            SHOW PROFILE
          </button>
          
          <button
            onClick={onReset}
            type="button"
            className="flex-1 xl:flex-none py-4 px-6 rounded-xl bg-[#1B1622] text-white/60 hover:text-red-400 font-extrabold text-sm tracking-wider uppercase border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};
