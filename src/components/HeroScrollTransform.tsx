import React, { useState, useEffect, useRef } from "react";
import { eventConfig } from "../config/eventConfig";
import { Sparkles, ChevronDown } from "lucide-react";
import { RoyalFrameCorner } from "./IndianMotifs";

export const HeroScrollTransform: React.FC = () => {
  // 0 = Image 1 (Portrait), 1 = Image 2 (25 Balloons)
  const [morphValue, setMorphValue] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const touchStartY = useRef<number>(0);
  const isUnlockedRef = useRef<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const morphValueRef = useRef<number>(0);

  // Keep refs in sync with state for event listeners
  useEffect(() => {
    isUnlockedRef.current = isUnlocked;
  }, [isUnlocked]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    morphValueRef.current = morphValue;
  }, [morphValue]);

  // Trigger the transformation animation from Image 1 to Image 2
  const triggerTransformation = () => {
    if (isAnimatingRef.current || morphValueRef.current >= 1) {
      if (morphValueRef.current >= 1 && !isUnlockedRef.current) {
        // Already transformed, unlock scrolling
        setIsUnlocked(true);
        document.body.style.overflow = "auto";
      }
      return;
    }

    setIsAnimating(true);
    const startTime = performance.now();
    const duration = 650; // Smooth 650ms transition

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Smooth ease-in-out curve
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setMorphValue(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setMorphValue(1);
        setIsAnimating(false);
        // After transformation finishes, unlock page scrolling
        setTimeout(() => {
          setIsUnlocked(true);
          document.body.style.overflow = "auto";
        }, 150);
      }
    };

    requestAnimationFrame(animate);
  };

  // Lock body scroll initially until transformation completes
  useEffect(() => {
    // Start locked at the top
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      // If still locked at top:
      if (!isUnlockedRef.current) {
        if (e.deltaY > 5) {
          e.preventDefault();
          triggerTransformation();
        }
      } else {
        // If user scrolls all the way back to top and rolls up, allow re-locking if desired
        if (window.scrollY === 0 && e.deltaY < -40 && morphValueRef.current === 1) {
          // Keep unlocked or let them scroll naturally
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isUnlockedRef.current) {
        if (e.touches.length > 0) {
          const deltaY = touchStartY.current - e.touches[0].clientY;
          if (deltaY > 10) {
            // User attempted to swipe/scroll down -> prevent scroll, transform image first!
            if (e.cancelable) e.preventDefault();
            triggerTransformation();
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isUnlockedRef.current) {
        if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
          e.preventDefault();
          triggerTransformation();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleUnlockClick = () => {
    if (morphValue < 1) {
      triggerTransformation();
    } else {
      setIsUnlocked(true);
      document.body.style.overflow = "auto";
      const nextEl = document.getElementById("invitation-start");
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const portraitOpacity = morphValue >= 0.98 ? 0 : Math.max(0, 1 - morphValue);
  const balloonsOpacity = morphValue <= 0.02 ? 0 : Math.min(1, morphValue);

  return (
    <section className="relative w-full h-screen min-h-screen flex flex-col items-center justify-between py-3 sm:py-5 px-3 sm:px-6 z-20 select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="w-full max-w-xl text-center z-30 pt-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-400/40 text-slate-200 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-1 shadow-md backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>25th Silver Jubilee Celebration</span>
          <Sparkles className="w-3 h-3 text-amber-300" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif silver-text-gradient tracking-tight drop-shadow-lg leading-tight">
          {eventConfig.couple.partner1} &amp; {eventConfig.couple.partner2}
        </h1>
      </div>

      {/* Centerpiece: Grand Hero Photo Frame */}
      <div
        onClick={triggerTransformation}
        className="relative w-full max-w-[380px] sm:max-w-[460px] md:max-w-[500px] h-[68vh] sm:h-[72vh] max-h-[660px] flex items-center justify-center my-auto cursor-pointer"
        title={morphValue < 1 ? "Click or scroll to transform" : undefined}
      >
        {/* Shimmering Halo Aura */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-slate-300/20 via-slate-100/10 to-amber-200/15 blur-2xl -z-10 animate-pulse" />

        {/* Grand Royal Silver Frame */}
        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-100 via-slate-400 to-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-slate-300/60 flex flex-col">
          
          {/* Inner Photo Viewport */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#070913] border-2 border-slate-300/40">
            
            {/* Royal Corner Accents */}
            <RoyalFrameCorner position="tl" className="z-30 top-2 left-2" />
            <RoyalFrameCorner position="tr" className="z-30 top-2 right-2" />
            <RoyalFrameCorner position="bl" className="z-30 bottom-2 left-2" />
            <RoyalFrameCorner position="br" className="z-30 bottom-2 right-2" />

            {/* Photo 1: Portrait (Starts 100% visible, transforms on scroll) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: portraitOpacity,
                transform: `scale(${1 + morphValue * 0.04})`,
                transition: isAnimating ? "none" : "opacity 0.2s ease-out",
              }}
            >
              <img
                src="/images/photo_portrait.jpg"
                alt={`${eventConfig.couple.partner1} & ${eventConfig.couple.partner2} Portrait`}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a14]/80 via-transparent to-[#080a14]/15" />
            </div>

            {/* Photo 2: 25 Balloons (Transforms in place while scroll is locked) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: balloonsOpacity,
                transform: `scale(${1.04 - (1 - morphValue) * 0.04})`,
                transition: isAnimating ? "none" : "opacity 0.2s ease-out",
              }}
            >
              <img
                src="/images/photo_balloons.jpg"
                alt={`${eventConfig.couple.partner1} & ${eventConfig.couple.partner2} with 25 Balloons`}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a14]/80 via-transparent to-[#080a14]/15" />
            </div>

            {/* Silver Foil Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay" />
          </div>
        </div>
      </div>

      {/* Bottom Subtle Navigation Indicator */}
      <div className="flex flex-col items-center text-center z-30 pb-2">
        <button
          onClick={handleUnlockClick}
          className={`p-2 rounded-full border transition-all duration-300 shadow-lg cursor-pointer ${
            morphValue >= 0.95
              ? "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 border-white animate-bounce scale-105"
              : "bg-slate-900/80 text-slate-300 border-slate-400/40 hover:bg-slate-800"
          }`}
          aria-label={morphValue < 1 ? "Transform photo" : "Scroll to invitation"}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
