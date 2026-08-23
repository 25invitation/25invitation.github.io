import React from "react";

export const MandalaDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 opacity-85 ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-slate-400 to-slate-200" />
      <svg
        className="w-6 h-6 text-slate-300 animate-pulse"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-slate-400 to-slate-200" />
    </div>
  );
};

export const SilverPaisley: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = "",
  flipped = false,
}) => {
  return (
    <svg
      className={`w-8 h-8 text-slate-300/60 ${flipped ? "scale-x-[-1]" : ""} ${className}`}
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M50 5 C25 5 10 25 10 48 C10 70 28 88 50 88 C72 88 90 70 90 48 C90 32 78 20 65 20 C55 20 48 27 48 37 C48 45 54 51 62 51 C66 51 70 48 70 44 C70 40 67 37 63 37 C61 37 60 38 59 39 C59 36 62 33 66 33 C73 33 80 40 80 50 C80 65 67 78 50 78 C33 78 20 65 20 48 C20 30 32 15 50 15 C60 15 68 20 73 27 L78 22 C71 13 61 5 50 5 Z" />
    </svg>
  );
};

export const DiyaLight: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Diya Flame */}
      <div className="w-2.5 h-4 bg-gradient-to-t from-amber-400 to-yellow-100 rounded-full shadow-[0_0_12px_#fbbf24] animate-bounce" />
      {/* Diya Base */}
      <svg className="w-6 h-3 text-slate-300 -mt-1" viewBox="0 0 24 12" fill="currentColor">
        <path d="M2 2 C6 10 18 10 22 2 C16 4 8 4 2 2 Z" />
      </svg>
    </div>
  );
};

export const RoyalFrameCorner: React.FC<{ position: "tl" | "tr" | "bl" | "br"; className?: string }> = ({
  position,
  className = "",
}) => {
  const rotation = {
    tl: "rotate-0",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <svg
      className={`w-8 h-8 text-slate-300/70 absolute ${rotation} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 38 V12 C2 6.477 6.477 2 12 2 H38" />
      <path d="M8 38 V14 C8 10.686 10.686 8 14 8 H38" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
      <path d="M2 2 L12 12" strokeOpacity="0.6" />
    </svg>
  );
};
