"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-config";

const SUPPORT_SERVICES_LIST = [
  "Managed IT Services",
  "Sales & Services of Computers & Computer Peripherals",
  "Facility Management",
  "VPN, MPLS & Leased Line Internet Broadband Services",
  "All Kinds of Networking",
  "Annual Maintenance Contract (AMC)",
  "All Kinds of Printer",
];

export function SupportServicesSection() {
  return (
    <section id="support" className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Large Red Background Card with White Typography & Checkmarks */}
          <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-[#d92525] p-8 sm:p-12 md:p-14 text-white shadow-xl transition-transform duration-300 hover:shadow-2xl">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
              Support &amp; Services
            </h2>

            <ul className="space-y-4">
              {SUPPORT_SERVICES_LIST.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3.5 text-sm sm:text-base font-semibold text-white transition-transform duration-200 hover:translate-x-1"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#d92525] shadow-sm">
                    <CheckCircle2 className="h-4 w-4 fill-white text-[#d92525]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Professional IT Support Image */}
          <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <Image
              src={SITE_IMAGES.supportImage}
              alt="Professional IT Support & AMC Services at Gurudev InfoTech"
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
