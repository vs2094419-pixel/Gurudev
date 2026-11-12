"use client";

import React from "react";
import { BRAND } from "@/lib/constants";
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  ExternalLink,
  Navigation,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#f8fafc] min-h-[80vh] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Centralized Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f9b233]/15 px-4 py-1.5 border border-[#f9b233]/30">
            <ShieldCheck className="h-4 w-4 text-[#d92525]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#0b1528] font-extrabold">
              Total IT Solutions Since 1998
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0b1528] leading-tight">
            Contact Gurudev InfoTech
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Need enterprise hardware supply, certified cabling installation, software licensing, AMC contracts, or technical assistance? Contact our engineering team directly via phone, email, or visit our Bengaluru office.
          </p>
        </div>

        {/* Centralized 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Phone Support */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm text-center flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9b233] text-white shadow-md shadow-[#f9b233]/25 mb-5">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h2 className="font-display text-lg font-bold text-[#0b1528]">
                Phone Support
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Direct lines for sales, hardware &amp; technical queries
              </p>
              <div className="space-y-1.5 text-sm font-bold text-slate-800">
                <div>
                  <a
                    href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                    className="hover:text-[#d92525] transition-colors"
                  >
                    {BRAND.phone}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`}
                    className="hover:text-[#d92525] transition-colors"
                  >
                    {BRAND.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1528] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#d92525]"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Card 2: Email Enquiries */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm text-center flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d92525] text-white shadow-md shadow-[#d92525]/25 mb-5">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="font-display text-lg font-bold text-[#0b1528]">
                Email Enquiries
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Official quotes, tenders &amp; corporate proposals
              </p>
              <div className="text-sm font-bold text-slate-800">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-[#d92525] transition-colors break-all"
                >
                  {BRAND.email}
                </a>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d92525] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#b01c1c]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Card 3: Working Hours */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm text-center flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1528] text-white shadow-md shadow-black/15 mb-5">
                <Clock className="h-6 w-6 text-[#f9b233]" />
              </div>
              <h2 className="font-display text-lg font-bold text-[#0b1528]">
                Working Hours
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Office &amp; Help Desk operational timing
              </p>
              <div className="space-y-1 text-xs text-slate-700">
                <p className="font-bold text-sm text-[#0b1528]">
                  Monday – Saturday
                </p>
                <p className="font-medium">9:30 AM – 7:00 PM</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="pt-6">
              <div className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>AMC On-Call Support</span>
              </div>
            </div>
          </div>

        </div>

        {/* Centralized Head Office Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0b1528] via-[#101f3d] to-[#0b1528] p-7 sm:p-9 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-0 h-48 w-48 rounded-full bg-[#f9b233]/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d92525] text-white shadow-lg">
                <MapPin className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#f9b233] font-bold">
                  Head Office
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  GURUDEV INFOTECH
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {BRAND.address}
                </p>
              </div>
            </div>

            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#f9b233] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0b1528] shadow-lg shadow-[#f9b233]/25 transition-all hover:bg-[#e89e1c] shrink-0"
            >
              <Navigation className="h-4 w-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Centralized Interactive Google Maps Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0b1528]">
                Location Map
              </h2>
              <p className="text-xs text-slate-500">
                102, Gangamma Temple St, Ashok Nagar, Bengaluru 560050
              </p>
            </div>

            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d92525] hover:underline"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title="Gurudev InfoTech Bengaluru Location Map"
              src={BRAND.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
