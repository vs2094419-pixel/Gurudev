"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BRAND } from "@/lib/constants";
import { luxuryEase } from "@/lib/motion";

const SESSION_KEY = "gi_preloader_seen";

export function Preloader() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setLoading(false);
        return;
      }
    } catch {
      // Safe fallback
    }

    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Safe fallback in restricted storage contexts
      }
    }, 1350);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="brand-luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            filter: "blur(4px)",
            transition: { duration: 0.55, ease: luxuryEase },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/98 backdrop-blur-md select-none overflow-hidden"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Subtle ambient brand background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1.15 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#0b1528]/10 via-[#d92525]/10 to-[#f9b233]/15 blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Same High-Resolution Brand Logo as Header/Footer */}
            <div className="relative mb-3 flex items-center justify-center">
              <BrandLogo
                variant="dark"
                size="xl"
                priority
                className="justify-center"
                imageClassName="mx-auto"
              />
            </div>

            {/* Elegant center-expanding brand line indicator */}
            <div className="relative mt-2 h-[2px] w-32 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.15,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#0b1528] via-[#d92525] to-[#f9b233]"
              />
            </div>

            {/* Brand tagline subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: luxuryEase }}
              className="mt-3.5 text-[11px] uppercase tracking-[0.25em] text-slate-700 font-bold"
            >
              {BRAND.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
