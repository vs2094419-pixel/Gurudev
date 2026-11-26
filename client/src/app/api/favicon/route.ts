import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/server/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let iconUrl: string | null = null;

    try {
      const row = await prisma.banner.findFirst({
        where: { title: "__site_images__" },
      });
      if (row?.subtitle) {
        const data = JSON.parse(row.subtitle);
        iconUrl = data.tabIcon || data.siteLogo || null;
      }
    } catch (dbErr) {
      console.warn("Favicon DB query failed:", dbErr);
    }

    // 1. If external URL (e.g. Cloudinary)
    if (iconUrl && iconUrl.startsWith("http")) {
      try {
        const res = await fetch(iconUrl);
        if (res.ok) {
          const contentType = res.headers.get("content-type") || "image/png";
          const buffer = await res.arrayBuffer();
          return new Response(buffer, {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=60, s-maxage=300",
            },
          });
        }
      } catch (fetchErr) {
        console.warn("Failed to proxy external favicon:", fetchErr);
        return NextResponse.redirect(iconUrl, { status: 307 });
      }
    }

    // 2. If base64 data URL
    if (iconUrl && iconUrl.startsWith("data:")) {
      const parts = iconUrl.split(",");
      const match = parts[0].match(/:(.*?);/);
      const mime = match ? match[1] : "image/png";
      const buffer = Buffer.from(parts[1], "base64");
      return new Response(buffer, {
        headers: {
          "Content-Type": mime,
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }

    // 3. Fallback to local emblem image
    const localPath = path.join(process.cwd(), "public", "brand", "emblem.png");
    if (fs.existsSync(localPath)) {
      const buffer = fs.readFileSync(localPath);
      return new Response(buffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }
  } catch (err) {
    console.error("Favicon route error:", err);
  }

  return new Response(null, { status: 404 });
}
