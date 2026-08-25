import React from "react";
import { MandalaDivider, DiyaLight } from "./IndianMotifs";

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-slate-700/50 bg-[#070811] py-14 px-4 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">

        <div className="flex items-center gap-3">
          <DiyaLight />
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
            ✨ With Love &amp; Gratitude ✨
          </span>
          <DiyaLight />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif silver-text-gradient font-bold tracking-tight">
          Saksham &amp; Samarth
        </h3>

        <p className="text-xs sm:text-sm italic font-editorial text-slate-300 max-w-md">
          "Thank you for being an indispensable part of our 25-year journey. We look forward to creating everlasting memories with you."
        </p>

        <MandalaDivider className="my-2" />

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 pt-2">
          <span>Silver Jubilee Celebration • 2001 - 2026</span>
        </div>

      </div>
    </footer>
  );
};
