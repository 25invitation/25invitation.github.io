import React from "react";
import { eventConfig } from "../config/eventConfig";
import { Sparkles, Shirt } from "lucide-react";
import { MandalaDivider } from "./IndianMotifs";

export const DressCode: React.FC = () => {
  const { dressCode } = eventConfig;

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-10">
      <div className="relative rounded-3xl p-6 sm:p-8 card-glass silver-shimmer-border overflow-hidden shadow-xl">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-500/30 text-xs font-semibold uppercase tracking-widest text-slate-300 mb-2">
            <Shirt className="w-3.5 h-3.5 text-slate-300" />
            <span>Attire Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif silver-text-gradient font-bold tracking-tight">
            {dressCode.theme}
          </h2>

          <MandalaDivider className="my-2" />

          {dressCode.description && (
            <p className="text-xs sm:text-sm text-slate-300 font-editorial italic max-w-lg">
              {dressCode.description}
            </p>
          )}
        </div>

        {/* Style Suggestions */}
        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-2.5">
          {dressCode.suggestions.map((sug, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/30"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{sug}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
