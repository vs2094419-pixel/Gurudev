import React from "react";
import Image from "next/image";
import { SVG_LOGO_MAP, type PartnerCompany } from "@/lib/partners-config";

interface PartnerLogoProps {
  partner: PartnerCompany;
  color?: string;
  className?: string;
}

export function PartnerLogoRenderer({
  partner,
  color = "#ffffff",
  className = "h-8 sm:h-9 max-h-10 max-w-[130px] w-auto",
}: PartnerLogoProps) {
  // Ensure an explicit height is present so inline SVGs never collapse to 0 height in flex containers
  const effectiveClass = /\bh-|\bh\[/.test(className)
    ? className
    : `h-8 sm:h-9 ${className}`;

  if (partner.svgKey && SVG_LOGO_MAP[partner.svgKey]) {
    const Component = SVG_LOGO_MAP[partner.svgKey];
    return <Component color={color} className={effectiveClass} />;
  }

  if (partner.logoUrl) {
    return (
      <img
        src={partner.logoUrl}
        alt={partner.name}
        className={`${effectiveClass} object-contain`}
      />
    );
  }

  // Elegant text badge fallback for any newly added custom company
  return (
    <span
      style={{ color }}
      className="font-display text-sm sm:text-base font-extrabold tracking-wider uppercase text-center px-2 line-clamp-1"
    >
      {partner.name}
    </span>
  );
}
