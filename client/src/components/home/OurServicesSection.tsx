"use client";

import React from "react";
import { motion } from "motion/react";

interface ServiceItem {
  id: string;
  title: string;
  description?: string;
  iconBg: string; // Tailwind class
  icon: React.ReactNode;
}

const SERVICES_ROW_1: ServiceItem[] = [
  {
    id: "consultancy",
    title: "IT Consultancy Services",
    iconBg: "bg-[#f9b233]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <path d="m9 10-2 2 2 2" />
        <path d="m15 10 2 2-2 2" />
        <path d="M12 16v4" />
        <path d="M8 20h8" />
      </svg>
    ),
  },
  {
    id: "hardware-software",
    title: "Hardware & Software Supply",
    iconBg: "bg-[#f97316]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="3" width="6" height="5" rx="1" />
        <rect x="3" y="16" width="6" height="5" rx="1" />
        <rect x="15" y="16" width="6" height="5" rx="1" />
        <path d="M12 8v4" />
        <path d="M6 12h12" />
        <path d="M6 12v4" />
        <path d="M18 12v4" />
      </svg>
    ),
  },
  {
    id: "network",
    title: "Network Solutions",
    iconBg: "bg-[#d92525]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="M12 8v3" />
        <path d="M10 14l-3 2" />
        <path d="M14 14l3 2" />
        <path d="M8 17.5h8" />
      </svg>
    ),
  },
  {
    id: "security",
    title: "Security Solutions",
    iconBg: "bg-[#f9b233]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const SERVICES_ROW_2: ServiceItem[] = [
  {
    id: "stationeries",
    title: "Stationeries & Consumables",
    iconBg: "bg-[#f97316]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
  {
    id: "interactive",
    title: "Interactive Solutions",
    iconBg: "bg-[#d92525]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
        <path d="m14 10-4 3V7l4 3z" />
      </svg>
    ),
  },
  {
    id: "website-design",
    title: "Website Design",
    iconBg: "bg-[#f9b233]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="14" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 6h.01" />
        <path d="M11 6h.01" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    iconBg: "bg-[#d92525]",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

function getBorderClass(index: number) {
  return `${index < 3 ? "lg:border-r-[2.5px] lg:border-[#0b1528]" : "lg:border-r-0"} ${
    index % 2 === 0 ? "sm:border-r-[2.5px] sm:border-[#0b1528]" : "sm:border-r-0"
  }`;
}

export function OurServicesSection() {
  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Container with Light Grey / Blue Background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#edf3f8] px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 shadow-md border border-slate-200/60"
        >
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1528] tracking-tight max-w-3xl mx-auto leading-snug">
              Propelling your business growth through future-proof IT solutions
            </h2>
          </div>

          {/* Services Rows with Vertical Navy Blue Dividers */}
          <div className="space-y-8 sm:space-y-12">
            
            {/* ROW 1: 4 Columns on lg, 2 on sm, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-y-8 lg:gap-0 items-center">
              {SERVICES_ROW_1.map((service, index) => (
                <div
                  key={service.id}
                  className={`group flex items-center justify-start sm:justify-center px-3 sm:px-4 lg:px-5 py-3 lg:py-2 ${getBorderClass(
                    index
                  )}`}
                >
                  <div className="flex items-center gap-3.5 transition-transform duration-300 group-hover:translate-x-1.5 sm:group-hover:translate-x-0 sm:group-hover:-translate-y-1">
                    {/* Rounded Icon Badge with Soft Shadow */}
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${service.iconBg} shadow-md shadow-black/10 transition-transform duration-300 group-hover:scale-105`}
                    >
                      {service.icon}
                    </div>

                    {/* Service Title in Dark Navy Blue */}
                    <h3 className="font-display text-sm sm:text-base lg:text-base font-bold text-[#0b1528] tracking-tight leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2: 4 Columns on lg, 2 on sm, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-y-8 lg:gap-0 items-center">
              {SERVICES_ROW_2.map((service, index) => (
                <div
                  key={service.id}
                  className={`group flex items-center justify-start sm:justify-center px-3 sm:px-4 lg:px-5 py-3 lg:py-2 ${getBorderClass(
                    index
                  )}`}
                >
                  <div className="flex items-center gap-3.5 transition-transform duration-300 group-hover:translate-x-1.5 sm:group-hover:translate-x-0 sm:group-hover:-translate-y-1">
                    {/* Rounded Icon Badge with Soft Shadow */}
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${service.iconBg} shadow-md shadow-black/10 transition-transform duration-300 group-hover:scale-105`}
                    >
                      {service.icon}
                    </div>

                    {/* Service Title in Dark Navy Blue */}
                    <h3 className="font-display text-sm sm:text-base lg:text-base font-bold text-[#0b1528] tracking-tight leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
