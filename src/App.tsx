import { useState, useEffect } from "react";
import { getGuestFromUrl, type GuestProfile } from "./config/eventConfig";
import { TinselSparkles } from "./components/TinselSparkles";
import { HeroScrollTransform } from "./components/HeroScrollTransform";
import { PersonalizedGreeting } from "./components/PersonalizedGreeting";
import { CountdownTimer } from "./components/CountdownTimer";
import { EventDetails } from "./components/EventDetails";
import { Timeline } from "./components/Timeline";
import { DressCode } from "./components/DressCode";
import { RsvpForm } from "./components/RsvpForm";

import { MusicPlayer } from "./components/MusicPlayer";
import { Footer } from "./components/Footer";

export function App() {
  const [currentGuest, setCurrentGuest] = useState<GuestProfile>(getGuestFromUrl());


  useEffect(() => {
    // Listen to hash / query changes if user navigates
    const handleUrlChange = () => {
      setCurrentGuest(getGuestFromUrl());
    };
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080a14] text-slate-100 selection:bg-slate-300 selection:text-slate-950 font-sans">
      {/* Background Interactive Tinsel & Silver Sparkle Particle Canvas */}
      <TinselSparkles />

      {/* Main Content Sections */}
      <main className="relative z-20 flex flex-col items-center w-full">
        {/* 1. Hero Section with Scroll Transformation from Photo 2 (portrait) to Photo 1 (25 balloons) */}
        <HeroScrollTransform />

        {/* 2. Personalized Welcome Card for the Invited Guest */}
        <PersonalizedGreeting currentGuest={currentGuest} />

        {/* 3. Event Details (Date, Time, Venue, Maps & Calendar) */}
        <EventDetails />

        {/* 4. Indian Celebration Timeline & Program */}
        <Timeline />

        {/* 5. Dress Code & Style Guide */}
        <DressCode />

        {/* 6. Custom Google Forms RSVP Experience */}
        <RsvpForm
          currentGuest={currentGuest}
        />

        {/* 7. Live Silver Jubilee Countdown Timer */}
        <CountdownTimer />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Audio Player */}
      <MusicPlayer />


    </div>
  );
}

export default App;
