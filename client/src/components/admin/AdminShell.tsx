"use client";
/**
 * AdminShell: the admin panel frame: a deep-ink sidebar (a drawer below `lg`),
 * a top bar with a scoped search and the admin menu, and the page content area.
 *
 *   <AdminSessionProvider><AdminShell>{children}</AdminShell></AdminSessionProvider>
 *
 * Mounted once by app/admin/(panel)/layout.tsx; pages render only their content
 * (start with <PageHeader>). Nav items live in ADMIN_NAV below. The top-bar search
 * sends the admin to /admin/<scope>?q=<term>.
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useId, useState } from "react";
import { AdminMenu } from "./AdminMenu";
import { Drawer } from "./Drawer";
import { IconButton } from "./IconButton";
import {
  BoxIcon,
  CloseIcon,
  DashboardIcon,
  FolderIcon,
  HistoryIcon,
  ImageIcon,
  MenuIcon,
  SettingsIcon,
  StarIcon,
} from "./icons";
import { cx, focusRing } from "./styles";

export const ADMIN_NAV = [
  { group: "Overview", items: [{ label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon }] },
  {
    group: "Brand Partners",
    items: [
      { label: "Hardware Partners", href: "/admin/hardware", icon: BoxIcon },
      { label: "Networking Brands", href: "/admin/networking", icon: FolderIcon },
      { label: "Software Vendors", href: "/admin/softwares", icon: StarIcon },
    ],
  },
  {
    group: "Media & Content",
    items: [
      { label: "Site Photos", href: "/admin/site-images", icon: ImageIcon },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Audit log", href: "/admin/audit-log", icon: HistoryIcon },
      { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
    ],
  },
] as const;

function Brand() {
  return (
    <Link href="/admin/dashboard" className={cx("flex items-center gap-2.5 rounded px-1 py-1", focusRing)}>
      <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden border border-amber-400/40 bg-[#0b1528]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/emblem.png" alt="Gurudev InfoTech Logo" className="h-full w-full object-contain p-0.5" />
      </div>
      <div>
        <span className="block font-display text-lg leading-none font-bold tracking-[0.08em] text-white">GURUDEV</span>
        <span className="mt-0.5 block text-[9px] tracking-[0.2em] text-[#f9b233] uppercase font-bold">Admin Portal</span>
      </div>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-color:rgba(251,249,243,0.15)_transparent] [scrollbar-width:thin]">
      {ADMIN_NAV.map((section) => (
        <div key={section.group} className="mb-5">
          <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.24em] text-ivory/40 uppercase">{section.group}</p>
          <ul className="space-y-0.5">
            {section.items.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "group relative flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                      active ? "bg-white/[0.08] text-ivory" : "text-ivory/65 hover:bg-white/[0.05] hover:text-ivory",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cx("absolute inset-y-2 left-0 w-0.5 rounded-full bg-gold-400 transition-opacity", active ? "opacity-100" : "opacity-0")}
                    />
                    <Icon className={cx("size-[18px] shrink-0", active ? "text-gold-300" : "text-sage-300/70 group-hover:text-sage-200")} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-white/10 px-6 py-4 text-[11px] leading-relaxed text-ivory/40">
      GURUDEV INFOTECH · Total IT Solutions Since 1998
    </div>
  );
}

function TopHeaderBar() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Gurudev IT Management Console
        </span>
      </div>
      <Link
        href="/"
        target="_blank"
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-[#0b1528] hover:text-white transition-colors"
      >
        <span>View Live Site</span>
        <span>↗</span>
      </Link>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-ivory text-ink">
      <a
        href="#admin-main"
        className="sr-only z-[70] rounded-md bg-ink px-4 py-3 text-sm text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-ink lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Brand />
        </div>
        <SidebarNav />
        <SidebarFooter />
      </aside>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="left" hideHeader ariaLabel="Admin navigation" width="w-[min(18rem,86vw)]" panelClassName="bg-ink">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 py-3 pr-2 pl-5">
            <Brand />
            <IconButton label="Close navigation" tone="light" onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <SidebarNav onNavigate={() => setDrawerOpen(false)} />
          <SidebarFooter />
        </div>
      </Drawer>

      <div className="flex min-h-dvh flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-ink/10 bg-white/85 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:gap-4 sm:px-6">
          <IconButton label="Open navigation" className="lg:hidden" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen}>
            <MenuIcon />
          </IconButton>
          <TopHeaderBar />
          <div className="ml-auto">
            <AdminMenu />
          </div>
        </header>
        <main id="admin-main" tabIndex={-1} className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-8 focus:outline-none sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
