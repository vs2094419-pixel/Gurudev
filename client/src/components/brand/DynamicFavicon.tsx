"use client";

import { useEffect } from "react";
import { SITE_IMAGES } from "@/lib/site-config";

export function updateBrowserFavicon(iconUrl: string) {
  if (!iconUrl || typeof document === "undefined") return;

  // Add timestamp query parameter so Google Chrome ignores its local favicon cache
  const cacheBuster = iconUrl.includes("?") ? `&t=${Date.now()}` : `?t=${Date.now()}`;
  const finalUrl = iconUrl.startsWith("data:") ? iconUrl : `${iconUrl}${cacheBuster}`;

  // 1. Remove all existing favicon and icon link elements
  const existingLinks = document.querySelectorAll("link[rel*='icon']");
  existingLinks.forEach((el) => el.remove());

  // 2. Append fresh <link rel="icon">
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = iconUrl.endsWith(".svg") ? "image/svg+xml" : "image/png";
  link.href = finalUrl;
  document.head.appendChild(link);

  // 3. Append fresh <link rel="shortcut icon">
  const shortcut = document.createElement("link");
  shortcut.rel = "shortcut icon";
  shortcut.href = finalUrl;
  document.head.appendChild(shortcut);

  // 4. Append fresh <link rel="apple-touch-icon">
  const apple = document.createElement("link");
  apple.rel = "apple-touch-icon";
  apple.href = finalUrl;
  document.head.appendChild(apple);
}

export function DynamicFavicon() {
  useEffect(() => {
    // 1. Immediately apply cached or default tab icon (0ms delay!)
    const cached = typeof window !== "undefined" ? localStorage.getItem("gi_tab_icon") : null;
    const initialIcon = cached || SITE_IMAGES.tabIcon;
    if (initialIcon) {
      updateBrowserFavicon(initialIcon);
    }

    // 2. Fetch fresh from DB and update cache
    fetch("/api/admin/site-images")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const tabIcon = json.data.tabIcon || json.data.siteLogo;
          if (tabIcon && tabIcon.trim()) {
            updateBrowserFavicon(tabIcon);
            try {
              localStorage.setItem("gi_tab_icon", tabIcon);
            } catch {}
          }
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
