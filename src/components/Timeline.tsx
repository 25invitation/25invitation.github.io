import React from "react";
import { eventConfig } from "../config/eventConfig";
import { PartyPopper, Sparkles, Heart, Music, Utensils, GlassWater } from "lucide-react";
import { MandalaDivider } from "./IndianMotifs";

export const Timeline: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    PartyPopper: <PartyPopper className="w-5 h-5 text-amber-300" />,
    Sparkles: <Sparkles className="w-5 h-5 text-amber-300" />,
    Heart: <Heart className="w-5 h-5 text-rose-300" />,
    Music: <Music className="w-5 h-5 text-purple-300" />,
    Utensils: <Utensils className="w-5 h-5 text-emerald-300" />,
    GlassWater: <GlassWater className="w-5 h-5 text-blue-300" />,
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Evening Itinerary
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif silver-text-gradient font-bold tracking-tight mt-1">
          Celebration Events
        </h2>
        <MandalaDivider className="my-2" />
        <p className="text-xs sm:text-sm text-slate-300 font-editorial italic max-w-md">
          A joyous evening filled with traditions, music, tributes, and grand festivities.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-slate-300 before:via-slate-500 before:to-amber-300/40">
        {eventConfig.timeline.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-slate-300 shadow-[0_0_12px_rgba(226,232,240,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            </div>

            {/* Event Item Card */}
            <div className="p-5 sm:p-6 rounded-2xl card-glass silver-shimmer-border group-hover:border-slate-300/50 transition-all duration-300 shadow-md">
              <div className="flex justify-end mb-2">
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-slate-300" />}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-100 mb-1">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
