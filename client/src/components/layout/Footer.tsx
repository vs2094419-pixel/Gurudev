import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  ShieldCheck,
  Server,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

const SERVICES_LINKS = [
  { label: "IT Consultancy Services", href: "/#services" },
  { label: "Hardware & Software Supply", href: "/#hardware" },
  { label: "Network Solutions", href: "/#networking" },
  { label: "Security Solutions", href: "/#services" },
  { label: "Stationeries & Consumables", href: "/#services" },
  { label: "Interactive Solutions", href: "/#services" },
  { label: "Website Design", href: "/#services" },
  { label: "Website Maintenance", href: "/#services" },
];

const PRODUCTS_LINKS = [
  { label: "Hardware Products", href: "/#hardware" },
  { label: "Structured Cabling", href: "/#networking" },
  { label: "Molex & Cisco Networks", href: "/#networking" },
  { label: "Softwares & Licences", href: "/#softwares" },
  { label: "Server Racks & Accessories", href: "/#networking" },
  { label: "3M & Audio/Video Solutions", href: "/#softwares" },
];

const SUPPORT_LINKS = [
  { label: "Managed IT Services", href: "/#support" },
  { label: "Annual Maintenance Contracts (AMC)", href: "/#support" },
  { label: "Facility Management", href: "/#support" },
  { label: "VPN, MPLS & Leased Lines", href: "/#support" },
  { label: "Printer & Computer Repairs", href: "/#support" },
  { label: "Request Support / Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#070d1e] text-slate-300 border-t border-slate-800">
      {/* Brand value badge strip */}
      <div className="border-b border-slate-800/80 bg-[#0b1528]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Award className="h-5 w-5 text-[#f9b233] shrink-0" />
              <p className="text-xs tracking-wider uppercase text-slate-200 font-semibold">
                Established in 1998 • 25+ Years of Trust
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Server className="h-5 w-5 text-[#f9b233] shrink-0" />
              <p className="text-xs tracking-wider uppercase text-slate-200 font-semibold">
                Authorized Hardware &amp; Cabling Partners
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#f87171] shrink-0" />
              <p className="text-xs tracking-wider uppercase text-slate-200 font-semibold">
                24/7 Enterprise AMC &amp; Facility Support
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Company Summary Column (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-2 focus-visible:outline-[#f9b233] rounded"
              aria-label={`${BRAND.name} — Home`}
            >
              <BrandLogo variant="light" size="lg" />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              <strong className="text-white">GURUDEV INFOTECH</strong> is a dynamic organization run by experienced professionals in the field of IT since 1998. We provide total IT solutions including Hardware, Software, Security Devices, Consumables and Networking.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#f9b233] shrink-0 mt-0.5" />
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                  title="Open in Google Maps"
                >
                  {BRAND.address}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#f9b233] shrink-0" />
                <div className="flex items-center gap-2">
                  <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                    {BRAND.phone}
                  </a>
                  <span>/</span>
                  <a href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                    {BRAND.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#f9b233] shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#f9b233] shrink-0" />
                <span>Monday – Saturday: 9:30 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links Navigation (8 cols: 3 sub-columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Services */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f9b233]">
                Our Services
              </p>
              <ul className="mt-4 space-y-2.5 text-xs">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-slate-300 hover:text-[#f9b233] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Products & Brands */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f9b233]">
                Products &amp; Cabling
              </p>
              <ul className="mt-4 space-y-2.5 text-xs">
                {PRODUCTS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-slate-300 hover:text-[#f9b233] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support & AMC */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f9b233]">
                Support &amp; AMC
              </p>
              <ul className="mt-4 space-y-2.5 text-xs">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-slate-300 hover:text-[#f9b233] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p className="tracking-wide">
            © 1998 – {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="hover:text-slate-300 transition-colors">
              About Us
            </Link>
            <Link href="/#services" className="hover:text-slate-300 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact &amp; Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
