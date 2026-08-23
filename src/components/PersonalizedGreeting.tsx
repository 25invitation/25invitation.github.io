import React from "react";
import { type GuestProfile } from "../config/eventConfig";
import { MandalaDivider } from "./IndianMotifs";
import { Heart, Sparkles } from "lucide-react";

interface PersonalizedGreetingProps {
  currentGuest: GuestProfile;
}

export const PersonalizedGreeting: React.FC<PersonalizedGreetingProps> = ({
  currentGuest,
}) => {
  return (
    <section id="invitation-start" className="relative w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Silver Filigree Card Container */}
      <div className="relative rounded-3xl p-6 sm:p-10 card-glass silver-shimmer-border overflow-hidden shadow-2xl">
        
        {/* Shimmer Background Sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-amber-200/5 pointer-events-none" />

        {/* Header Motifs */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-300">
              Personal Invitation
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif silver-text-gradient font-bold tracking-tight">
            {currentGuest.salutation || `Dear ${currentGuest.name}`}
          </h2>

          <MandalaDivider className="my-3" />

          {/* Personalized Host Message */}
          <div className="max-w-xl text-center space-y-4 my-2">
            <p className="text-base sm:text-lg font-editorial italic text-slate-200 leading-relaxed">
              "{currentGuest.customNote ||
                "Together with our families, we joyfully request the pleasure of your company as we celebrate 25 years of cherished love, friendship, and togetherness."}"
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-400/30 text-xs sm:text-sm font-medium text-slate-200 shadow">
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300/20" />
              <span>You &amp; Your Family are Cordially Invited</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
