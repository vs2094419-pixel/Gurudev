"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-config";
import { DEFAULT_PARTNERS, type PartnerCompany } from "@/lib/partners-config";
import { PartnerLogoRenderer } from "@/components/brand/PartnerLogoRenderer";

const OTHERS_LIST = [
  "3M Workspace Ergonomic Products",
  "3M Optical System Division",
  "Access Control & Solutions",
  "VOX Spectrum Products",
  "Projectors & Other Accessories",
  "Audio & Video Solutions",
  "Maxhub Interactive Solutions",
  "Cloud Storage & Services",
  "Open Source Based Firewall Services",
];

export function SoftwaresAndOthersSection() {
  const [brands, setBrands] = useState<PartnerCompany[]>(
    DEFAULT_PARTNERS.software.filter((p) => p.isActive)
  );

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.software) {
          setBrands(json.data.software);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="softwares" className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Dark Navy / Purple Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0f1738] px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 left-1/3 -z-0 h-96 w-96 rounded-full bg-[#f9b233]/5 blur-3xl pointer-events-none" />

          {/* Heading: SOFTWARES in Golden Yellow */}
          <div className="relative z-10 text-center mb-10 sm:mb-14">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest text-[#f9b233]">
              SOFTWARES
            </h2>
          </div>

          {/* Horizontal Software Brand Logos Strip (Dynamic & Customizable) */}
          <div className="relative z-10 mb-14 sm:mb-16">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {brands.map((brand) => (
                <div
                  key={brand.id || brand.name}
                  className="flex h-16 min-w-[120px] items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                  title={brand.name}
                >
                  <PartnerLogoRenderer
                    partner={brand}
                    color="#ffffff"
                    className="h-7 sm:h-8 max-h-10 max-w-[140px] w-auto drop-shadow-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Below Logos: Two-Column Layout (Others Card + Software Development Image) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Golden Yellow Background Card with White Checklist */}
            <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-[#f9b233] p-8 sm:p-10 md:p-12 text-white shadow-xl transition-transform duration-300 hover:shadow-2xl">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-7">
                Others
              </h3>

              <ul className="space-y-3.5">
                {OTHERS_LIST.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3.5 text-sm sm:text-base font-semibold text-white transition-transform duration-200 hover:translate-x-1"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#f9b233] shadow-xs">
                      <CheckCircle2 className="h-4 w-4 fill-white text-[#f9b233]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Professional IT/Software Development Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[300px] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
              <Image
                src={SITE_IMAGES.softwareImage}
                alt="Software Development Solutions"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
