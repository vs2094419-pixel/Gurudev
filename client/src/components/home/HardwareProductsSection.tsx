"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { DEFAULT_PARTNERS, type PartnerCompany } from "@/lib/partners-config";
import { PartnerLogoRenderer } from "@/components/brand/PartnerLogoRenderer";

export function HardwareProductsSection() {
  const [brands, setBrands] = useState<PartnerCompany[]>(
    DEFAULT_PARTNERS.hardware.filter((p) => p.isActive)
  );

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.hardware) {
          setBrands(json.data.hardware);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="hardware" className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navy Blue Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0b1528] px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -z-0 h-96 w-96 rounded-full bg-[#f9b233]/5 blur-3xl pointer-events-none" />

          {/* Section Headers */}
          <div className="relative z-10 mb-10 sm:mb-14">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Products
            </h2>
            <p className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-wider text-[#f9b233]">
              HARDWARE
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: White Rounded Card */}
            <div className="lg:col-span-5 flex flex-col justify-center rounded-3xl bg-white p-8 sm:p-10 md:p-12 text-[#1e293b] shadow-xl">
              <p className="text-sm sm:text-base leading-relaxed text-[#1e293b] font-medium">
                We provide a plethora of bespoke IT hardware and networking solutions, custom fitted to your business or facility. Our clients over several decades have come to acclaim our value-added support and maintenance services that ensure your investments are efficient and future-proof.
              </p>
            </div>

            {/* Right Column: Hardware Brand Logos Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {brands.map((brand) => (
                  <div
                    key={brand.id || brand.name}
                    className="group flex h-24 items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/25 hover:shadow-lg hover:-translate-y-1"
                    title={brand.name}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                      <PartnerLogoRenderer
                        partner={brand}
                        color="#ffffff"
                        className="h-8 sm:h-9 max-h-10 max-w-[110px] w-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
