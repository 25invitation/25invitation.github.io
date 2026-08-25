import React from "react";
import { Sparkles } from "lucide-react";
import type { GuestProfile } from "../config/eventConfig";

interface EnvelopeGateProps {
  guest: GuestProfile;
  onOpen: () => void;
}

export const EnvelopeGate: React.FC<EnvelopeGateProps> = ({ guest, onOpen }) => {
  return (
    <section className="envelope-gate" aria-label="Your personal invitation">
      <div className="envelope-gate__glow" aria-hidden="true" />
      <div className="envelope-gate__content">
        <div className="flex items-center justify-center gap-2 text-amber-200/90">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em]">A personal invitation</span>
          <Sparkles className="h-4 w-4" />
        </div>

        <button type="button" className="invitation-envelope" onClick={onOpen} aria-label={`Open invitation for ${guest.name}`}>
          <span className="invitation-envelope__paper" aria-hidden="true" />
          <span className="invitation-envelope__flap" aria-hidden="true" />
          <span className="invitation-envelope__front" aria-hidden="true" />
          <span className="invitation-envelope__seal" aria-hidden="true">✦</span>
          <span className="invitation-envelope__name">{guest.name}</span>
        </button>

        <p className="mt-6 text-sm tracking-wide text-slate-300">Tap the envelope to open your invitation</p>
      </div>
    </section>
  );
};
