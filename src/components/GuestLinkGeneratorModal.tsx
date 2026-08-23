import React, { useState } from "react";
import { eventConfig, type GuestProfile } from "../config/eventConfig";
import { Copy, Check, Share2, MessageCircle, UserPlus, X, ExternalLink } from "lucide-react";

interface GuestLinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGuest: (guest: GuestProfile) => void;
}

export const GuestLinkGeneratorModal: React.FC<GuestLinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectGuest,
}) => {
  const [selectedGuestKey, setSelectedGuestKey] = useState<string>("sharma-family");
  const [customName, setCustomName] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedMsg, setCopiedMsg] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentBaseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      : "https://your-anniversary-site.com/";

  const activeGuest: GuestProfile =
    customName.trim() !== ""
      ? {
          id: "custom-" + customName.toLowerCase().replace(/\s+/g, "-"),
          name: customName,
          salutation: `Dear ${customName}`,
          customNote: "We cordially invite you to celebrate 25 years of love and companionship with us.",
        }
      : eventConfig.guests[selectedGuestKey] || eventConfig.guests["sharma-family"];

  const generatedUrl =
    customName.trim() !== ""
      ? `${currentBaseUrl}?name=${encodeURIComponent(customName)}`
      : `${currentBaseUrl}?guest=${activeGuest.id}`;

  const whatsAppMessage = `✨ *25th Silver Jubilee Anniversary Celebration* ✨\n\n${activeGuest.salutation || "Dear " + activeGuest.name},\n\nWe would be honored to have you celebrate 25 years of love and togetherness with *${eventConfig.couple.partner1} & ${eventConfig.couple.partner2}*!\n\n🗓 *Date:* ${eventConfig.event.date}\n⏰ *Time:* ${eventConfig.event.time}\n📍 *Venue:* ${eventConfig.event.venueName}, ${eventConfig.event.address}\n\n👗 *Dress Code:* ${eventConfig.dressCode.theme}\n\n💌 *View Your Personal Invitation & RSVP:* \n${generatedUrl}\n\nWith love,\n${eventConfig.couple.partner1} & ${eventConfig.couple.partner2}`;

  const copyToClipboard = async (text: string, isLink: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } else {
        setCopiedMsg(true);
        setTimeout(() => setCopiedMsg(false), 2500);
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handlePreviewAsGuest = () => {
    onSelectGuest(activeGuest);
    onClose();
  };

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
            Guest Link &amp; WhatsApp Invite Generator
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Generate unique URLs for each guest with personalized greetings.
          </p>
        </div>

        {/* Selection Tabs / Modes */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              1. Select Pre-Configured Guest
            </label>
            <select
              value={selectedGuestKey}
              onChange={(e) => {
                setSelectedGuestKey(e.target.value);
                setCustomName("");
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              {Object.entries(eventConfig.guests).map(([key, guest]) => (
                <option key={key} value={key}>
                  {guest.name} — ?guest={key}
                </option>
              ))}
            </select>
          </div>

          {/* OR Create On-the-Fly Guest */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <UserPlus className="w-3.5 h-3.5 text-slate-400" />
              <span>Or Type Any Guest Name On The Fly:</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="e.g. Cherished Friends & Family"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Generated URL Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 mb-6">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Generated Unique URL for {activeGuest.name}
            </span>
            <button
              onClick={handlePreviewAsGuest}
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:underline cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Preview Site as this Guest</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/60 text-xs text-slate-200 font-mono select-all focus:outline-none"
            />
            <button
              onClick={() => copyToClipboard(generatedUrl, true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Mobile QR Code Scanner */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&margin=4&bgcolor=0e1224&color=f1f5f9&data=${encodeURIComponent(generatedUrl)}`}
              alt="Scan QR code on your phone"
              className="w-24 h-24 rounded-xl border border-slate-700 p-1 bg-[#0e1224] shadow-inner"
              loading="lazy"
            />
            <div className="text-xs text-slate-400 text-center sm:text-left space-y-1">
              <span className="font-semibold text-slate-200 block">📱 Test On Your Mobile Phone</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scan this QR code with your iPhone or Android camera to instantly open and test the mobile web experience for <strong>{activeGuest.name}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Ready Invitation Text */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pre-Formatted WhatsApp Message</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(whatsAppMessage, false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-600"
              >
                {copiedMsg ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 whitespace-pre-line font-sans max-h-44 overflow-y-auto leading-relaxed">
            {whatsAppMessage}
          </div>
        </div>
      </div>
    </div>
  );
};
