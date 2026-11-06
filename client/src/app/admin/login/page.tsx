import { Suspense } from "react";
import { ToastProvider } from "@/components/admin/Toast";
import { FadeImage } from "@/components/store/FadeImage";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

/** Admin sign-in: an editorial split layout (image left, form right; form only on mobile). */
export default function AdminLoginPage() {
  return (
    <ToastProvider>
      <div className="grid min-h-dvh bg-slate-50 lg:grid-cols-[1.1fr_1fr]">
        <aside aria-hidden className="relative hidden overflow-hidden bg-[#070d1e] lg:block">
          <FadeImage
            src="/images/corporate/server-rack.jpg"
            alt=""
            loading="eager"
            className="object-cover opacity-60"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070d1e] via-[#070d1e]/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 p-10">
            <p className="font-display text-3xl font-bold tracking-[0.1em] text-white">GURUDEV INFOTECH</p>
            <p className="mt-1 text-[10px] tracking-[0.25em] text-[#f9b233] uppercase font-bold">Admin Portal</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
            <div aria-hidden className="mb-5 h-1 w-14 bg-[#f9b233]" />
            <p className="max-w-md font-display text-3xl leading-tight text-white xl:text-4xl font-extrabold">
              Total IT Solutions Since 1998.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Manage website section photos, hardware and software catalogs, inquiries, and corporate IT operations.
            </p>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-12 sm:px-10">
          <div className="w-full max-w-sm">
            <div className="mb-10 lg:hidden">
              <p className="font-display text-2xl font-bold tracking-wider text-[#0b1528]">GURUDEV INFOTECH</p>
              <p className="mt-1 text-[10px] tracking-[0.25em] text-[#d92525] uppercase font-bold">Admin Portal</p>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-[#0b1528]">Welcome Back</h1>
            <div aria-hidden="true" className="mt-2 h-1 w-12 bg-[#f9b233]" />
            <p className="mt-4 text-xs text-slate-500">Sign in with your admin credentials to manage the portal.</p>
            <Suspense fallback={<div className="mt-8 h-80" />}>
              <LoginForm />
            </Suspense>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
