"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-config";

export interface BrandLogoProps {
  variant?: "dark" | "light" | "original";
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

const SIZE_CONFIG = {
  sm: { width: 200, height: 48, container: "h-10 sm:h-11 w-auto" },
  md: { width: 280, height: 65, container: "h-13 sm:h-15 md:h-16 w-auto max-w-[280px] sm:max-w-[320px]" },
  lg: {
    width: 380,
    height: 88,
    container: "h-14 sm:h-16 md:h-18 lg:h-20 w-auto max-w-[300px] sm:max-w-[360px] md:max-w-[420px]",
  },
  xl: { width: 460, height: 108, container: "h-20 sm:h-24 md:h-28 w-auto" },
  custom: { width: 380, height: 88, container: "" },
} as const;

export function BrandLogo({
  variant = "dark",
  size = "md",
  priority = false,
  className = "",
  imageClassName = "",
}: BrandLogoProps) {
  const [customLogo, setCustomLogo] = useState<string | null>(
    SITE_IMAGES.siteLogo && SITE_IMAGES.siteLogo !== "/brand/logo.svg" && SITE_IMAGES.siteLogo !== "/brand/emblem.png"
      ? SITE_IMAGES.siteLogo
      : null
  );

  useEffect(() => {
    fetch("/api/admin/site-images")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.siteLogo) {
          if (json.data.siteLogo !== "/brand/logo.svg" && json.data.siteLogo !== "/brand/emblem.png") {
            setCustomLogo(json.data.siteLogo);
          }
        }
      })
      .catch(() => {});
  }, []);

  const defaultSrc =
    variant === "light"
      ? BRAND.logoLight
      : variant === "original"
      ? BRAND.logoOriginal
      : BRAND.logoDark;

  const src = customLogo || defaultSrc;
  const config = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  return (
    <div
      className={`relative inline-flex items-center justify-start transition-opacity duration-300 hover:opacity-90 ${config.container} ${className}`}
    >
      <Image
        src={src}
        alt={`${BRAND.name} — ${BRAND.tagline}`}
        width={config.width}
        height={config.height}
        priority={priority}
        unoptimized
        className={`h-full w-auto max-h-full object-contain select-none ${
          imageClassName.includes("object-") ? "" : "object-left"
        } ${imageClassName}`}
      />
    </div>
  );
}
