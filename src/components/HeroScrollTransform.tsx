import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const lockedScrollY = useRef<number>(0);
  const originalScrollStyles = useRef<Record<string, string> | null>(null);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lockPageScroll = useCallback(() => {
    const { body, documentElement } = document;

    if (originalScrollStyles.current) return;

    lockedScrollY.current = window.scrollY;
    originalScrollStyles.current = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
      htmlOverflow: documentElement.style.overflow,
      htmlOverscrollBehavior: documentElement.style.overscrollBehavior,
    };

    // `overflow: hidden` alone is ignored by some iOS and in-app browsers.
    // Fixing the body in place prevents the visual viewport from moving too.
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
  }, []);

  const restorePageScroll = useCallback(() => {
    const { body, documentElement } = document;
    const original = originalScrollStyles.current;

    if (original) {
      body.style.overflow = original.bodyOverflow;
      body.style.position = original.bodyPosition;
      body.style.top = original.bodyTop;
      body.style.left = original.bodyLeft;
      body.style.right = original.bodyRight;
      body.style.width = original.bodyWidth;
      body.style.touchAction = original.bodyTouchAction;
      documentElement.style.overflow = original.htmlOverflow;
      documentElement.style.overscrollBehavior = original.htmlOverscrollBehavior;
      originalScrollStyles.current = null;
    }

    window.scrollTo(0, lockedScrollY.current);
  }, []);

  const unlockPageScroll = useCallback(() => {
    restorePageScroll();
    isUnlockedRef.current = true;
    setIsUnlocked(true);
  }, [restorePageScroll]);

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
        unlockPageScroll();
      }
      return;
    }

    isAnimatingRef.current = true;
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

      morphValueRef.current = eased;
      setMorphValue(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setMorphValue(1);
        morphValueRef.current = 1;
        isAnimatingRef.current = false;
        setIsAnimating(false);
        // After transformation finishes, unlock page scrolling
        unlockTimer.current = setTimeout(() => {
          unlockPageScroll();
        }, 150);
      }
    };

    requestAnimationFrame(animate);
  };

  // Lock body scroll initially until transformation completes
  useEffect(() => {
    // Start locked at the top
    window.scrollTo(0, 0);
    lockPageScroll();

    const handleWheel = (e: WheelEvent) => {
      if (!isUnlockedRef.current) {
        e.preventDefault();
        if (e.deltaY > 5) {
          triggerTransformation();
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
        if (e.cancelable) e.preventDefault();
        if (e.touches.length > 0) {
          const deltaY = touchStartY.current - e.touches[0].clientY;
          if (deltaY > 10) {
            triggerTransformation();
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isUnlockedRef.current) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Enter"].includes(e.key)) {
          e.preventDefault();
          triggerTransformation();
        }
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      restorePageScroll();
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lockPageScroll, restorePageScroll]);

  const handleUnlockClick = () => {
    if (morphValue < 1) {
      triggerTransformation();
    } else {
      unlockPageScroll();
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
          <span>25th Wedding Anniversary Celebration</span>
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

        {/* Kept over the photo so it stays in view on short screens. */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 z-40 -translate-x-1/2">
        <button
          onClick={handleUnlockClick}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 shadow-lg cursor-pointer animate-bounce ${
            morphValue >= 0.95
              ? "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 border-white scale-105"
              : "bg-slate-900/80 text-slate-300 border-slate-400/40 hover:bg-slate-800"
          }`}
          aria-label={morphValue < 1 ? "Transform photo" : "Scroll to invitation"}
        >
          <span className="text-xs font-semibold tracking-wide">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        </div>
      </div>
    </section>
  );
};
