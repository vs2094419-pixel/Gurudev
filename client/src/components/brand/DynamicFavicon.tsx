"use client";

import { useEffect } from "react";

export function updateBrowserFavicon(iconUrl: string) {
  if (!iconUrl || typeof document === "undefined") return;

  const rels = ["icon", "shortcut icon", "apple-touch-icon"];
  rels.forEach((rel) => {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = iconUrl;
  });
}

export function DynamicFavicon() {
  useEffect(() => {
    fetch("/api/admin/site-images")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const tabIcon = json.data.tabIcon || json.data.siteLogo;
          if (tabIcon && tabIcon.trim()) {
            updateBrowserFavicon(tabIcon);
          }
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
