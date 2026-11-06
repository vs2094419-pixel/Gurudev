"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { luxuryEase } from "@/lib/motion";
import {
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  PhoneCall,
  Mail,
  ArrowRight,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Luxury gold scroll progress indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f9b233] via-[#d92525] to-[#f9b233] origin-left z-50 pointer-events-none"
      />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-[#0b1528] py-2 px-4 text-center text-xs text-slate-200 font-medium border-b border-slate-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] sm:text-xs">
            <div className="hidden sm:flex items-center gap-2 text-slate-300">
              <span className="inline-block h-2 w-2 rounded-full bg-[#f9b233] animate-pulse" />
              <span>GURUDEV INFOTECH • Total IT Solutions Since 1998</span>
            </div>

            <div className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-3 sm:gap-6 text-slate-300">
              <div className="inline-flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="h-3.5 w-3.5 text-[#f9b233]" />
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#f9b233] transition-colors"
                >
                  {BRAND.phone}
                </a>
                <span className="text-slate-600 hidden sm:inline">,</span>
                <a
                  href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`}
                  className="hidden sm:inline hover:text-[#f9b233] transition-colors"
                >
                  {BRAND.phoneSecondary}
                </a>
              </div>
              <a
                href={`mailto:${BRAND.email}`}
                className="hidden md:inline-flex items-center gap-1.5 hover:text-[#f9b233] transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#f9b233]" />
                <span>{BRAND.email}</span>
              </a>
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1 text-slate-400 hover:text-[#f9b233] transition-colors"
                title="View location on Google Maps"
              >
                <span>Bengaluru 560050</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:py-2.5 sm:px-6 min-h-[72px] sm:min-h-[82px]">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-1.5 text-slate-700 hover:text-[#0b1528] cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Brand Logo - Bold, prominent size matching design */}
          <Link
            href="/"
            className="flex items-center justify-start py-1 transition-transform duration-300 hover:scale-[1.02] shrink-0"
            aria-label={`${BRAND.name} — Home`}
          >
            <BrandLogo variant="dark" size="lg" priority />
            <span className="sr-only">{BRAND.name}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-[#d92525] ${
                    isActive
                      ? "text-[#d92525] font-extrabold"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 text-slate-700">
            {/* Direct Get Quote CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#0b1528] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#d92525] hover:shadow-md"
            >
              <span>Get Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Hidden Admin Profile menu - only rendered when an Admin is logged in */}
            {user && user.role === "ADMIN" && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:border-[#f9b233] hover:text-[#0b1528] cursor-pointer transition-colors shadow-2xs"
                >
                  <User className="h-4 w-4 text-[#d92525]" />
                  <span className="hidden sm:inline font-bold">Admin</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: luxuryEase }}
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 text-xs"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70 rounded-t-lg">
                        <p className="font-bold text-slate-900 truncate">{user.fullName || "Admin"}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 font-medium text-[#0b1528] hover:bg-slate-100 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        href="/admin/site-images"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 font-medium text-[#d92525] hover:bg-rose-50 transition-colors"
                      >
                        Site Photos Manager
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50 text-left cursor-pointer border-t border-slate-100 mt-1 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: luxuryEase }}
              className="relative flex w-4/5 max-w-xs flex-col bg-white p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={`${BRAND.name} — Home`}
                >
                  <BrandLogo variant="dark" size="md" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Drawer Links */}
              <div className="mt-6 flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1 text-slate-800 hover:text-[#d92525]"
                >
                  Home
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-1 text-slate-800 hover:text-[#d92525]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Drawer Bottom Contact Info */}
              <div className="mt-auto border-t border-slate-100 pt-6 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <PhoneCall className="h-4 w-4 text-[#f9b233] shrink-0 mt-0.5" />
                  <div className="flex flex-col font-semibold text-slate-800">
                    <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>{BRAND.phone}</a>
                    <a href={`tel:${BRAND.phoneSecondary.replace(/\s+/g, "")}`}>{BRAND.phoneSecondary}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#f9b233]" />
                  <a href={`mailto:${BRAND.email}`} className="text-slate-700">
                    {BRAND.email}
                  </a>
                </div>
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] text-slate-500 hover:text-[#d92525]"
                >
                  {BRAND.address}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 block w-full rounded-xl bg-[#0b1528] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                >
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
