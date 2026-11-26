import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { SITE_IMAGES, type SiteImagesConfig } from "@/lib/site-config";
import { prisma } from "@/server/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONFIG_PATH = path.join(process.cwd(), "src/lib/site-images.json");
const BANNER_KEY = "__site_images__";

let memoryConfig: SiteImagesConfig | null = null;

function readLocalFallback(): SiteImagesConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      return { ...SITE_IMAGES, ...JSON.parse(data) };
    }
  } catch {
    // Expected on serverless/read-only environments like Vercel
  }
  return SITE_IMAGES;
}

async function getConfig(): Promise<SiteImagesConfig> {
  // 1. Try DB first (persists across serverless cold starts on Vercel)
  try {
    const row = await prisma.banner.findFirst({
      where: { title: BANNER_KEY },
    });
    if (row?.subtitle) {
      const parsed = JSON.parse(row.subtitle) as Partial<SiteImagesConfig>;
      return { ...SITE_IMAGES, ...parsed };
    }
  } catch (err) {
    console.warn("Could not read site images from database, using fallback:", err);
  }

  // 2. In-memory cache
  if (memoryConfig) {
    return memoryConfig;
  }

  // 3. Local JSON fallback
  return readLocalFallback();
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(
      { success: true, data: config },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("GET site-images error:", err);
    return NextResponse.json(
      { success: true, data: SITE_IMAGES },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SiteImagesConfig>;
    const current = await getConfig();

    const updated: SiteImagesConfig = {
      siteLogo: body.siteLogo ?? current.siteLogo ?? "/brand/logo.png",
      tabIcon: body.tabIcon ?? current.tabIcon ?? "/icon.png",
      aboutImage: body.aboutImage ?? current.aboutImage,
      staffingImage: body.staffingImage ?? current.staffingImage,
      supportImage: body.supportImage ?? current.supportImage,
      softwareImage: body.softwareImage ?? current.softwareImage,
      heroImage: body.heroImage ?? current.heroImage,
    };

    // 1. Persist to Neon Postgres DB via Prisma
    try {
      const existing = await prisma.banner.findFirst({
        where: { title: BANNER_KEY },
      });
      if (existing) {
        await prisma.banner.update({
          where: { id: existing.id },
          data: {
            imageUrl: updated.siteLogo,
            subtitle: JSON.stringify(updated),
            isActive: false,
          },
        });
      } else {
        await prisma.banner.create({
          data: {
            title: BANNER_KEY,
            imageUrl: updated.siteLogo,
            subtitle: JSON.stringify(updated),
            sortOrder: -999,
            isActive: false,
          },
        });
      }
    } catch (dbErr) {
      console.warn("Could not save site images to DB:", dbErr);
    }

    // 2. Update memory cache
    memoryConfig = updated;

    // 3. Try writing to local filesystem if writable (dev only; don't throw on Vercel)
    try {
      if (fs.existsSync(path.dirname(CONFIG_PATH))) {
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2), "utf-8");
      }
    } catch {
      // Intentionally silent: Vercel lambda filesystem is read-only
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Failed to update site images config:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message || "Failed to update configuration" },
      { status: 500 }
    );
  }
}
