import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutAndStaffingSection } from "@/components/home/AboutAndStaffingSection";
import { OurServicesSection } from "@/components/home/OurServicesSection";
import { HardwareProductsSection } from "@/components/home/HardwareProductsSection";
import { NetworkingCablingSection } from "@/components/home/NetworkingCablingSection";
import { SupportServicesSection } from "@/components/home/SupportServicesSection";
import { SoftwaresAndOthersSection } from "@/components/home/SoftwaresAndOthersSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";

export const metadata: Metadata = {
  title: "Gurudev InfoTech — Total IT Solutions Since 1998",
  description:
    "GURUDEV INFOTECH provides complete IT solutions including Hardware & Software Supply, Network Solutions, Structured Cabling, Stationery and Consumables.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white selection:bg-[#f9b233] selection:text-[#0b1528]">
      {/* 1. Corporate IT Hero Banner */}
      <HeroSection />

      {/* 2. SECTION 1 (About Company) & SECTION 2 (Staffing Standards) */}
      <AboutAndStaffingSection />

      {/* 3. SECTION 4: Our Services (3-column x 2-row layout with navy dividers) */}
      <OurServicesSection />

      {/* 4. SECTION 5: Our Products – Hardware (Dark navy background, 12 brand logos) */}
      <HardwareProductsSection />

      {/* 5. SECTION 6: Networking & Structured Cabling (Red border card + Golden brand logos card) */}
      <NetworkingCablingSection />

      {/* 6. SECTION 7: Support & Services (Large red card + IT support image) */}
      <SupportServicesSection />

      {/* 7. SECTION 8: Softwares & Others (Dark navy container, software logos, Others card + dev image) */}
      <SoftwaresAndOthersSection />

      {/* 8. Conversion & Contact CTA */}
      <ContactCtaSection />
    </div>
  );
}
