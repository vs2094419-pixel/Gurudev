"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { DEFAULT_PARTNERS, type PartnerCompany } from "@/lib/partners-config";
import { PartnerLogoRenderer } from "@/components/brand/PartnerLogoRenderer";

export function NetworkingCablingSection() {
  const [brands, setBrands] = useState<PartnerCompany[]>(
    DEFAULT_PARTNERS.networking.filter((p) => p.isActive)
  );

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.networking) {
          setBrands(json.data.networking);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="networking" className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: White Card with Red Border & Centered Red Heading */}
          <div className="lg:col-span-5 flex items-center justify-center rounded-3xl bg-white border-[3px] border-[#d92525] p-8 sm:p-12 md:p-14 text-center shadow-md transition-transform duration-300 hover:shadow-lg">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#d92525] leading-snug tracking-tight">
              Networking &amp;<br />
              Structured Cabling<br />
              Installation &amp; Support
            </h2>
          </div>

          {/* Right Column: Golden Yellow Card with White Brand Logos Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-[#f9b233] p-8 sm:p-10 md:p-12 shadow-lg transition-transform duration-300 hover:shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center">
              {brands.map((brand) => (
                <div
                  key={brand.id || brand.name}
                  className="flex h-20 w-full items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                  title={brand.name}
                >
                  <PartnerLogoRenderer
                    partner={brand}
                    color="#ffffff"
                    className="max-h-12 max-w-[150px] w-auto drop-shadow-xs"
                  />
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
