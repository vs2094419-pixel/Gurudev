"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Server,
  Cpu,
  Headphones,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#070d1e] via-[#0b1528] to-[#111e3b] text-white pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#f9b233]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#d92525]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15">
              <span className="flex h-2 w-2 rounded-full bg-[#f9b233] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#f9b233]">
                Total IT Solutions Since 1998
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Enterprise IT Infrastructure,{" "}
              <span className="text-[#f9b233]">Hardware</span> &amp;{" "}
              <span className="text-[#f87171]">Managed Services</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mx-auto lg:mx-0">
              For over two decades, <strong className="text-white font-semibold">GURUDEV INFOTECH</strong> has empowered corporate enterprises, institutions, and growing businesses with end-to-end hardware supply, structured cabling, turnkey networking, and mission-critical 24/7 IT support.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#f9b233] shrink-0" />
                <span>Authorized Hardware &amp; Software Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#f9b233] shrink-0" />
                <span>Certified Structured Cabling (Molex &amp; Cisco)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#f9b233] shrink-0" />
                <span>Comprehensive AMC &amp; Facility Management</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#f9b233] shrink-0" />
                <span>Dedicated Rapid Response IT Engineers</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f9b233] px-7 py-3.5 text-sm font-bold text-[#0b1528] shadow-lg shadow-[#f9b233]/25 transition-all hover:bg-[#e89e1c] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
              >
                <span>Request IT Consultation</span>
              </Link>

              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 px-2 py-2">
                <PhoneCall className="h-4 w-4 text-[#f9b233]" />
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#f9b233] transition-colors"
                >
                  {BRAND.phone}
                </a>
                <span className="text-slate-500">/</span>
                <a
                  href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`}
                  className="hover:text-[#f9b233] transition-colors"
                >
                  {BRAND.phoneSecondary}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card with stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={SITE_IMAGES.heroImage}
                  alt="Enterprise IT Infrastructure & Data Center"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1528] via-transparent to-transparent opacity-80" />
                
                {/* Floating pill badge on image */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#0b1528]/85 p-3.5 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f9b233] text-[#0b1528]">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Full-Stack IT Deployment</p>
                      <p className="text-[11px] text-slate-300">Hardware • Network • Security</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#f9b233]">Since 1998</span>
                </div>
              </div>

              {/* 4 Stat Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-3">
                <div className="rounded-xl bg-white/5 p-3.5 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-[#f9b233]">25+ Years</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Industry Experience</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3.5 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-white">1000+</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Deployments Done</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3.5 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-white">50+</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Global Brand Partners</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3.5 border border-white/10 text-center">
                  <p className="text-2xl font-extrabold text-[#f87171]">24/7</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Support &amp; AMC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
