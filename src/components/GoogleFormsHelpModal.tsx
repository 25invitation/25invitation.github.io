import React from "react";
import { X, CheckCircle, ExternalLink } from "lucide-react";

interface GoogleFormsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleFormsHelpModal: React.FC<GoogleFormsHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 card-glass silver-shimmer-border shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-serif silver-text-gradient font-bold">
            How Google Forms Backend Works
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Connect your RSVP form to Google Sheets automatically in 3 simple steps without writing backend code.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-100">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-950 flex items-center justify-center text-xs">
                1
              </span>
              <span>Create a Google Form with 5 Questions</span>
            </div>
            <p className="text-slate-400 pl-8">
              Go to <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="text-amber-300 underline inline-flex items-center gap-0.5">Google Forms <ExternalLink className="w-3 h-3" /></a> and add these fields:
            </p>
            <ul className="pl-12 list-disc space-y-1 text-slate-300 font-mono text-xs">
              <li>Guest ID (Short answer)</li>
              <li>Guest Name (Short answer)</li>
              <li>Attending (Multiple choice: Yes / No)</li>
              <li>Guest Count (Short answer or number)</li>
              <li>Message / Wishes (Paragraph)</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-100">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-950 flex items-center justify-center text-xs">
                2
              </span>
              <span>Get "Pre-filled Link" for Entry IDs</span>
            </div>
            <p className="text-slate-400 pl-8">
              In Google Forms, click the 3 vertical dots (top right) → <strong className="text-slate-200">"Get pre-filled link"</strong>. Fill in dummy answers and click <strong className="text-slate-200">"Get link"</strong>.
            </p>
            <p className="text-slate-400 pl-8">
              The copied link looks like:
              <br />
              <code className="text-[11px] text-amber-200 bg-slate-950 px-2 py-1 rounded block mt-1 break-all">
                https://docs.google.com/forms/d/e/.../viewform?entry.123456=...&entry.789012=...
              </code>
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-100">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-950 flex items-center justify-center text-xs">
                3
              </span>
              <span>Paste into <code className="text-amber-200">src/config/eventConfig.ts</code></span>
            </div>
            <p className="text-slate-400 pl-8">
              Replace <code className="text-slate-200">formActionUrl</code> with <code className="text-slate-200">https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse</code>, match the entry IDs, and set <code className="text-slate-200">isLiveEnabled: true</code>.
            </p>
          </div>
        </div>

        {/* Benefits Note */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-200 leading-relaxed">
            <strong>Ready-to-use Preview Mode is already active!</strong> The RSVP form currently saves submissions locally and triggers celebratory effects, so you can test and share immediately even before connecting your live Google Form.
          </p>
        </div>
      </div>
    </div>
  );
};
