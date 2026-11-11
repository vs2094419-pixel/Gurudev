"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import {
  BoxIcon,
  FolderIcon,
  StarIcon,
  ImageIcon,
  CheckIcon,
} from "@/components/admin/icons";
import { card, cx } from "@/components/admin/styles";
import { DEFAULT_PARTNERS, type PartnersStore } from "@/lib/partners-config";
import { PartnerLogoRenderer } from "@/components/brand/PartnerLogoRenderer";

export function DashboardView() {
  const [partners, setPartners] = useState<PartnersStore>(DEFAULT_PARTNERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/partners")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setPartners(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hwActive = (partners.hardware || []).filter((p) => p.isActive).length;
  const netActive = (partners.networking || []).filter((p) => p.isActive).length;
  const swActive = (partners.software || []).filter((p) => p.isActive).length;

  return (
    <div className="space-y-8">
      {/* Dashboard Page Header */}
      <PageHeader
        title="Admin Control Center"
        description="Manage company partners (Hardware, Networking, Softwares) and homepage visual section photos for Gurudev InfoTech."
        actions={
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b1528] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#d92525] transition-colors"
          >
            <span>View Live Site</span>
            <span>↗</span>
          </Link>
        }
      />

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1: Hardware Partners */}
        <Link
          href="/admin/hardware"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-md hover:border-[#f9b233]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Hardware Partners
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1528] text-[#f9b233] transition-transform group-hover:scale-110">
              <BoxIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900">
              {hwActive}
            </span>
            <span className="text-xs text-slate-500">Live companies</span>
          </div>
          <p className="mt-2 text-xs font-bold text-[#d92525] group-hover:underline">
            Manage hardware brands →
          </p>
        </Link>

        {/* Stat 2: Networking Brands */}
        <Link
          href="/admin/networking"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-md hover:border-[#f9b233]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Networking Brands
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f9b233] text-[#0b1528] transition-transform group-hover:scale-110">
              <FolderIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900">
              {netActive}
            </span>
            <span className="text-xs text-slate-500">Live brands</span>
          </div>
          <p className="mt-2 text-xs font-bold text-[#d92525] group-hover:underline">
            Manage cabling brands →
          </p>
        </Link>

        {/* Stat 3: Software Vendors */}
        <Link
          href="/admin/softwares"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-md hover:border-[#f9b233]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Software Vendors
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d92525] text-white transition-transform group-hover:scale-110">
              <StarIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900">
              {swActive}
            </span>
            <span className="text-xs text-slate-500">Live vendors</span>
          </div>
          <p className="mt-2 text-xs font-bold text-[#d92525] group-hover:underline">
            Manage software logos →
          </p>
        </Link>

        {/* Stat 4: Site Section Photos */}
        <Link
          href="/admin/site-images"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-md hover:border-[#f9b233]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Site Section Photos
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white transition-transform group-hover:scale-110">
              <ImageIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900">
              5
            </span>
            <span className="text-xs text-slate-500">Configured sections</span>
          </div>
          <p className="mt-2 text-xs font-bold text-[#d92525] group-hover:underline">
            Customize photos →
          </p>
        </Link>

      </div>

      {/* Brand Partner Modules Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module 1: Hardware Partners */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Hardware Brands
              </h2>
              <Link
                href="/admin/hardware"
                className="text-xs font-bold text-[#d92525] hover:underline"
              >
                + Add Company
              </Link>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Homepage Section 5 (Dark navy container)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(partners.hardware || []).slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  className="flex h-14 items-center justify-center rounded-xl bg-[#0b1528] p-2 text-center"
                  title={b.name}
                >
                  <PartnerLogoRenderer partner={b} color="#ffffff" className="h-5 sm:h-6 max-h-6 max-w-[65px] w-auto" />
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/admin/hardware"
            className="block text-center rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Manage all {partners.hardware?.length || 0} hardware partners
          </Link>
        </div>

        {/* Module 2: Networking Brands */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Networking &amp; Cabling
              </h2>
              <Link
                href="/admin/networking"
                className="text-xs font-bold text-[#d92525] hover:underline"
              >
                + Add Brand
              </Link>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Homepage Section 6 (Golden yellow card)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(partners.networking || []).slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  className="flex h-14 items-center justify-center rounded-xl bg-[#f9b233] p-2 text-center shadow-xs"
                  title={b.name}
                >
                  <PartnerLogoRenderer partner={b} color="#ffffff" className="h-5 sm:h-6 max-h-6 max-w-[65px] w-auto" />
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/admin/networking"
            className="block text-center rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Manage all {partners.networking?.length || 0} cabling partners
          </Link>
        </div>

        {/* Module 3: Software Brands */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Software Vendors
              </h2>
              <Link
                href="/admin/softwares"
                className="text-xs font-bold text-[#d92525] hover:underline"
              >
                + Add Vendor
              </Link>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Homepage Section 8 (Softwares horizontal bar)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(partners.software || []).slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  className="flex h-14 items-center justify-center rounded-xl bg-[#0f1738] p-2 text-center"
                  title={b.name}
                >
                  <PartnerLogoRenderer partner={b} color="#ffffff" className="h-5 sm:h-6 max-h-6 max-w-[65px] w-auto" />
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/admin/softwares"
            className="block text-center rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Manage all {partners.software?.length || 0} software partners
          </Link>
        </div>

      </div>
    </div>
  );
}
