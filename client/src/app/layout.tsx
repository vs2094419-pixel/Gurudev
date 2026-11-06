import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import { StoreProviders } from "@/components/providers/StoreProviders";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gurudev InfoTech — Total IT Solutions Since 1998",
    template: "%s | Gurudev InfoTech",
  },
  description:
    "GURUDEV INFOTECH provides complete corporate IT solutions including Hardware & Software Supply, Network Solutions, Structured Cabling, Stationery & Consumables, and 24/7 Managed Services since 1998.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${josefin.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] font-sans">
        <StoreProviders>{children}</StoreProviders>
      </body>
    </html>
  );
}
