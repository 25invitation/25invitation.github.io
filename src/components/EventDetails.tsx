import React from "react";
import { eventConfig } from "../config/eventConfig";
import { Calendar, MapPin, Navigation, Download, ExternalLink } from "lucide-react";
import { MandalaDivider, SilverPaisley } from "./IndianMotifs";

export const EventDetails: React.FC = () => {
  const { event, couple } = eventConfig;

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.calendarDetails.title);
    const details = encodeURIComponent(event.calendarDetails.description);
    const location = encodeURIComponent(event.calendarDetails.location);
    const dates = `${event.calendarDetails.startTime}/${event.calendarDetails.endTime}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Generate .ics file for Apple Calendar / Outlook
  const downloadIcsFile = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//25th Anniversary Evite//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${event.calendarDetails.title}`,
      `DESCRIPTION:${event.calendarDetails.description}`,
      `LOCATION:${event.calendarDetails.location}`,
      `DTSTART:${event.calendarDetails.startTime}`,
      `DTEND:${event.calendarDetails.endTime}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${couple.partner1}_${couple.partner2}_25th_Anniversary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3">
          <SilverPaisley className="hidden sm:block" />
          <h2 className="text-2xl sm:text-4xl font-serif silver-text-gradient font-bold tracking-tight">
            Celebration Details
          </h2>
          <SilverPaisley flipped className="hidden sm:block" />
        </div>
        <MandalaDivider className="my-2" />
        <p className="text-sm sm:text-base text-slate-300 font-editorial italic max-w-lg">
          Please join us for an auspicious evening of laughter, dinner, music, and nostalgia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date & Time Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 card-glass silver-shimmer-border flex flex-col justify-between hover:border-slate-300/40 transition-all duration-300 shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-400/40 flex items-center justify-center mb-4 text-slate-200 shadow-md">
              <Calendar className="w-6 h-6 text-slate-200" />
            </div>

            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              When &amp; Time
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 mt-1 mb-2">
              {event.date}
            </h3>

            <p className="text-sm font-medium text-amber-200/90 mb-4">
              {event.time}
            </p>

            <p className="text-xs text-slate-300/80 leading-relaxed">
              Formal celebrations and Swagat begin promptly at 5:30 PM.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-700/50 flex flex-wrap gap-2">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-500/30 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Calendar</span>
            </a>
            <button
              onClick={downloadIcsFile}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-500/30 transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Apple / Outlook (.ics)</span>
            </button>
          </div>
        </div>

        {/* Venue & Location Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 card-glass silver-shimmer-border flex flex-col justify-between hover:border-slate-300/40 transition-all duration-300 shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-400/40 flex items-center justify-center mb-4 text-slate-200 shadow-md">
              <MapPin className="w-6 h-6 text-slate-200" />
            </div>

            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Where
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 mt-1">
              {event.venueName}
            </h3>

            <p className="text-sm font-semibold text-slate-300 mb-2">
              {event.venueHall}
            </p>

            <p className="text-xs text-slate-300/90 leading-relaxed">
              {event.address}
              <br />
              {event.cityStateZip}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-700/50">
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:brightness-110 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Driving Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
