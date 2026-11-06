import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Server,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  PhoneCall,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "About Us — Gurudev InfoTech",
  description:
    "GURUDEV INFOTECH is a dynamic organization run by experienced professionals in the field of IT since 1998, providing total IT infrastructure, hardware, and networking solutions.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white text-slate-800">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#070d1e] via-[#0b1528] to-[#111e3b] py-16 sm:py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-[#f9b233]/10 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#f9b233] font-bold">
            Total IT Solutions Since 1998
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            About Gurudev InfoTech
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A dynamic organization run by experienced professionals in the field of Information Technology for over two decades.
          </p>
        </div>
      </section>

      {/* Main Narrative - SECTION 1 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <Image
              src="/images/corporate/about-team.png"
              alt="Gurudev InfoTech Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
            <span className="text-xs uppercase tracking-[0.3em] text-[#f9b233] font-bold">
              Our Heritage &amp; Mission
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0b1528]">
              Decades of IT Excellence &amp; Customer Commitment
            </h2>
            <p>
              <strong className="text-[#0b1528] font-bold">GURUDEV INFOTECH</strong> is a dynamic organization run by experienced professionals in the field of IT since 1998. We provide total IT solutions including Hardware, Software, Security Devices, Consumables and Networking.
            </p>
            <p>
              With the economic liberalization in India, globalization has become an important part of today&apos;s business world. Having access to Information Technology at the right time is the key to success. We provide complete IT solutions including Hardware and Software Supply, Network Solutions, Structured Cabling, Stationery and Consumables. Our focus is to deliver high-quality, cost-effective solutions using state-of-the-art technology.
            </p>
            <div className="rounded-2xl bg-[#edf3f8] border-l-4 border-[#f9b233] p-4 text-sm font-medium text-[#0b1528]">
              &ldquo;Our focus is to deliver high-quality, cost-effective solutions using state-of-the-art technology.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* Staffing Standards - SECTION 2 */}
      <section className="bg-[#edf2f7] py-16 sm:py-20 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#d92525] font-bold">
                Quality &amp; Standards
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0b1528]">
                Staffing Standards &amp; Client First Approach
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                The quality of our technical and customer support services is our number one priority. Every employee is responsible for maintaining high service standards. All new staff members undergo an orientation programme covering corporate services and responsibilities. Continuous technical training keeps our employees updated with the latest developments in technology. We focus on professional service, technical knowledge and a customer-first approach.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-sm text-[#0b1528]">Rigorous Training</h3>
                  <p className="text-xs text-slate-600 mt-1">Continuous technical training in hardware, networks and security.</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-sm text-[#0b1528]">Client-Centric Mindset</h3>
                  <p className="text-xs text-slate-600 mt-1">Dedicated to rapid resolution and transparent technical assistance.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/corporate/tech-support.jpg"
                alt="Gurudev InfoTech Support Engineers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0b1528]">
            Partner with Gurudev InfoTech for Your Corporate Needs
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            From single-server procurement to enterprise-wide structured cabling and AMC contracts.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b1528] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#d92525] transition-all"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
