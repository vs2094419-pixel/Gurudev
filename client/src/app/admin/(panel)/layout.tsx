import { AdminSessionProvider } from "@/components/admin/AdminSession";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/Toast";

export const metadata = {
  title: { default: "Admin", template: "%s · Admin | Gurudev InfoTech" },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.ico", apple: "/icon.png" },
};

/**
 * Admin panel frame. proxy.ts has already bounced visitors without a session cookie;
 * AdminSessionProvider confirms the session is an ADMIN (GET /auth/me) before
 * rendering anything, and AdminShell draws the sidebar + top bar.
 */
export default function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <ToastProvider>
      <AdminSessionProvider>
        <AdminShell>{children}</AdminShell>
      </AdminSessionProvider>
    </ToastProvider>
  );
}
