import React, { useState, useEffect } from "react";
import { eventConfig } from "../config/eventConfig";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(eventConfig.event.isoDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds, isSeconds: true },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center">
        
        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-400/40 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 mb-3 shadow-md backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Celebration Countdown Timer</span>
          <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 font-medium">
          Counting down every moment until <strong className="text-slate-100">{eventConfig.event.date}</strong> at <strong className="text-slate-100">{eventConfig.event.venueName}</strong>
        </p>

        {timeLeft.isPast ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-400/40 text-center">
            <h3 className="text-2xl font-serif silver-text-gradient font-bold">
              The Celebration Is Here!
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Thank you for celebrating 25 glorious years with {eventConfig.couple.partner1} &amp; {eventConfig.couple.partner2}!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-xl">
            {timeUnits.map((unit, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl sm:rounded-3xl card-glass silver-shimmer-border group hover:border-slate-300/60 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Silver Sheen Accent */}
                <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />

                <span
                  className={`text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif silver-text-gradient tracking-tight tabular-nums drop-shadow-md ${
                    unit.isSeconds ? "animate-pulse" : ""
                  }`}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>

                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
                  {unit.label}
                </span>


              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
