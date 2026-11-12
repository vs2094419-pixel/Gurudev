"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function ContactCtaSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-[#0b1528] via-[#101f3d] to-[#0b1528] p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient highlights */}
          <div className="absolute top-0 right-0 -z-0 h-80 w-80 rounded-full bg-[#f9b233]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-0 h-80 w-80 rounded-full bg-[#d92525]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15">
                <ShieldCheck className="h-4 w-4 text-[#f9b233]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#f9b233]">
                  Trusted IT Partner Since 1998
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to Upgrade Your Corporate IT Infrastructure?
              </h2>

              <p className="text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Contact our technical experts today for bespoke hardware procurement, certified structured cabling, software licensing, and guaranteed AMC maintenance contracts.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f9b233] px-8 py-3.5 text-sm font-bold text-[#0b1528] shadow-lg shadow-[#f9b233]/25 transition-all hover:bg-[#e89e1c] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Request a Quotation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`tel:${BRAND.phone.replace(/\\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-[#f9b233]" />
                  <span>Call {BRAND.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Snapshot Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f9b233]/15 text-[#f9b233] mb-3">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Support</h3>
                <div className="mt-1 flex flex-col space-y-0.5 text-sm font-bold text-white">
                  <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="hover:text-[#f9b233] transition-colors">
                    {BRAND.phone}
                  </a>
                  <a href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-[#f9b233] transition-colors">
                    {BRAND.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d92525]/20 text-[#f87171] mb-3">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Inquiries</h3>
                <a href={`mailto:${BRAND.email}`} className="mt-1 block text-sm font-bold text-white hover:text-[#f9b233] truncate">
                  {BRAND.email}
                </a>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f9b233]/15 text-[#f9b233] mb-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</h3>
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs font-bold text-white hover:text-[#f9b233] leading-snug"
                  title="View on Google Maps"
                >
                  {BRAND.addressShort}
                </a>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white mb-3">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Working Hours</h3>
                <p className="mt-1 text-sm font-bold text-white">Mon – Sat: 9:30 AM – 7 PM</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
