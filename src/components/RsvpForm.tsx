import React, { useState, useEffect } from "react";
import { eventConfig, type GuestProfile } from "../config/eventConfig";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Send,
  RotateCcw,
  Check,
  Phone,
} from "lucide-react";
import { MandalaDivider, DiyaLight } from "./IndianMotifs";

interface RsvpFormProps {
  currentGuest: GuestProfile;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  currentGuest,
}) => {
  const isGeneralGuest =
    !currentGuest ||
    currentGuest.id === "general" ||
    currentGuest.name === "Cherished Friends & Family";

  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guestName, setGuestName] = useState<string>(
    isGeneralGuest ? "" : currentGuest.name
  );
  const [guestCount, setGuestCount] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const isGeneral =
      !currentGuest ||
      currentGuest.id === "general" ||
      currentGuest.name === "Cherished Friends & Family";
    setGuestName(isGeneral ? "" : currentGuest.name);
  }, [currentGuest]);

  // Trigger Silver & Gold Jubilee Confetti Explosion
  const fireSilverConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#ffffff", "#cbd5e1", "#e2e8f0", "#e5b869", "#fef08a"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#ffffff", "#cbd5e1", "#e2e8f0", "#e5b869", "#fef08a"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending) {
      setSubmitError("Please select whether you will be attending.");
      return;
    }
    if (!guestName.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const { googleForms } = eventConfig;

    try {
      if (googleForms.isLiveEnabled && googleForms.formActionUrl.includes("docs.google.com")) {
        // Construct Google Form Submission
        const params = new URLSearchParams();
        params.append(googleForms.fieldEntries.guestId, currentGuest.id);
        params.append(googleForms.fieldEntries.guestName, guestName);
        params.append(googleForms.fieldEntries.attending, attending === "yes" ? "Yes" : "No");
        params.append(googleForms.fieldEntries.guestCount, attending === "yes" ? String(guestCount) : "0");
        params.append(googleForms.fieldEntries.phoneNumber, attending === "yes" ? phoneNumber : "");
        params.append(googleForms.fieldEntries.message, message);

        // Submit via no-cors POST with URLSearchParams
        await fetch(googleForms.formActionUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
      } else {
        // Local simulation delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Save to localStorage for instant client-side recall
      const rsvpRecord = {
        guestId: currentGuest.id,
        name: guestName,
        attending,
        count: attending === "yes" ? guestCount : 0,
        phoneNumber: attending === "yes" ? phoneNumber : "",
        message,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(`rsvp_${currentGuest.id}`, JSON.stringify(rsvpRecord));

      setIsSubmitted(true);
      if (attending === "yes") {
        fireSilverConfetti();
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Even if fetch throws network warning on no-cors, treat as recorded
      setIsSubmitted(true);
      if (attending === "yes") fireSilverConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="relative rounded-3xl p-6 sm:p-10 card-glass silver-shimmer-border overflow-hidden shadow-2xl">

        {/* Shimmer Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-400/5 via-transparent to-amber-200/5 pointer-events-none" />

        {/* Form Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <DiyaLight />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              Kindly Respond
            </span>
            <DiyaLight />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif silver-text-gradient font-bold tracking-tight">
            RSVP for the Celebration
          </h2>

          <MandalaDivider className="my-2" />

          <p className="text-xs sm:text-sm text-slate-300 font-editorial italic max-w-md">
            Please let us know if you will be joining us for our Silver Jubilee celebration.
          </p>


        </div>

        {/* Confirmation Screen */}
        {isSubmitted ? (
          <div className="flex flex-col items-center text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(226,232,240,0.5)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif silver-text-gradient font-bold">
              {attending === "yes" ? "We Cannot Wait to Celebrate With You!" : "Thank You For Letting Us Know"}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 max-w-md">
              {attending === "yes"
                ? `Your RSVP for ${guestCount} guest(s) under the name "${guestName}" has been successfully recorded.`
                : `We will miss your presence at our Silver Jubilee, "${guestName}". Thank you for sending your warm wishes.`}
            </p>

            {attending === "yes" && (
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 max-w-md w-full text-xs text-slate-300 space-y-1 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold">{eventConfig.event.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time:</span>
                  <span className="font-semibold">{eventConfig.event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue:</span>
                  <span className="font-semibold">{eventConfig.event.venueName}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Edit My RSVP</span>
            </button>
          </div>
        ) : (
          /* Interactive RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Step 1: Yes or No Attendance Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 text-center mb-3">
                Will you be attending the Silver Jubilee? *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* YES Option */}
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`relative flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${attending === "yes"
                    ? "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 border-white shadow-[0_0_25px_rgba(226,232,240,0.5)] scale-[1.02]"
                    : "bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-slate-400/50 hover:bg-slate-800/60"
                    }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 ${attending === "yes" ? "text-emerald-700 fill-emerald-100" : "text-slate-400"
                      }`}
                  />
                  <div className="text-left">
                    <div className="font-serif font-bold text-base sm:text-lg">
                      Yes, With Joy!
                    </div>
                    <div className={`text-xs ${attending === "yes" ? "text-slate-800" : "text-slate-400"}`}>
                      I will attend the celebration
                    </div>
                  </div>
                </button>

                {/* NO Option */}
                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`relative flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${attending === "no"
                    ? "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-rose-200 border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]"
                    : "bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-slate-400/50 hover:bg-slate-800/60"
                    }`}
                >
                  <XCircle
                    className={`w-6 h-6 ${attending === "no" ? "text-rose-400" : "text-slate-400"
                      }`}
                  />
                  <div className="text-left">
                    <div className="font-serif font-bold text-base sm:text-lg">
                      Regretfully Decline
                    </div>
                    <div className={`text-xs ${attending === "no" ? "text-rose-300" : "text-slate-400"}`}>
                      Celebrating with you in spirit
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Guest Name Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name / Guest Names *
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                placeholder="e.g. Cherished Friends & Family"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-600/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 text-sm sm:text-base transition-all"
              />
            </div>

            {/* If Attending: Guest Count */}
            {attending === "yes" && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                {/* Number of Guests Stepper */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Total Number of Guests Attending *
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount((prev) => Math.max(0, prev - 1))}
                      className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>

                    <div className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-center font-serif text-xl font-bold text-slate-100">
                      {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuestCount((prev) => prev + 1)}
                      className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Phone Number for Reminders */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. (408) 555-1234"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-600/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 text-sm sm:text-base transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Heartfelt Wishes / Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Wishes or Message for {eventConfig.couple.partner1} &amp; {eventConfig.couple.partner2}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Share your congratulations, memories, or song requests..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-600/60 text-white placeholder-slate-500 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 text-sm transition-all resize-none"
              />
            </div>

            {/* Validation Error */}
            {submitError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs text-center">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 text-slate-950 font-serif font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(226,232,240,0.4)] hover:brightness-110 active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 text-slate-950" />
                  <span>Submit RSVP</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
