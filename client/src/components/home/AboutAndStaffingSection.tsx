"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SITE_IMAGES } from "@/lib/site-config";

export function AboutAndStaffingSection() {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: About Company (Screenshot 1 top)
            Left: Team photo (rounded-3xl)
            Right: Golden yellow card (rounded-3xl)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Professional Office / Team Image */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <Image
              src={SITE_IMAGES.aboutImage}
              alt="Gurudev InfoTech Team Collaborating on IT Solutions"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>

          {/* Right: Golden Yellow Card */}
          <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-[#f9b233] p-8 sm:p-12 md:p-14 shadow-lg text-[#0b1528] transition-transform duration-300 hover:shadow-xl">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1528] tracking-tight mb-5">
              About Company
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#0b1528]/95 font-normal">
              <p>
                <strong className="font-bold text-[#0b1528]">GURUDEV INFOTECH</strong> is a dynamic organization run by experienced professionals in the field of IT since 1998. We provide total IT solutions including Hardware, Software, Security Devices, Consumables and Networking.
              </p>
              <p>
                With the economic liberalization in India, globalization has become an important part of today&apos;s business world. Having access to Information Technology at the right time is the key to success. We provide complete IT solutions including Hardware and Software Supply, Network Solutions, Structured Cabling, Stationery and Consumables. Our focus is to deliver high-quality, cost-effective solutions using state-of-the-art technology.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: Staffing Standards (Screenshot 1 bottom)
            Left: Light grey card (rounded-3xl)
            Right: Professional office / team image (rounded-3xl)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Light Grey Background Card */}
          <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-[#edf2f7] p-8 sm:p-12 md:p-14 shadow-md text-[#0b1528] transition-transform duration-300 hover:shadow-lg border border-slate-200/80">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1528] tracking-tight mb-5">
              Staffing Standards
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#1e293b] font-normal">
              <p>
                The quality of our technical and customer support services is our number one priority. Every employee is responsible for maintaining high service standards. All new staff members undergo an orientation programme covering corporate services and responsibilities. Continuous technical training keeps our employees updated with the latest developments in technology. We focus on professional service, technical knowledge and a customer-first approach.
              </p>
            </div>
          </div>

          {/* Right: Professional Office / Team Image */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <Image
              src={SITE_IMAGES.staffingImage}
              alt="Gurudev InfoTech Staff & IT Engineers"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
