import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { SITE_IMAGES, type SiteImagesConfig } from "@/lib/site-config";

const CONFIG_PATH = path.join(process.cwd(), "src/lib/site-images.json");

function readConfig(): SiteImagesConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      return { ...SITE_IMAGES, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error("Failed to read site images config:", err);
  }
  return SITE_IMAGES;
}

export async function GET() {
  const config = readConfig();
  return NextResponse.json({ success: true, data: config });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SiteImagesConfig>;
    const current = readConfig();
    const updated: SiteImagesConfig = {
      siteLogo: body.siteLogo || current.siteLogo || "/brand/emblem.png",
      aboutImage: body.aboutImage || current.aboutImage,
      staffingImage: body.staffingImage || current.staffingImage,
      supportImage: body.supportImage || current.supportImage,
      softwareImage: body.softwareImage || current.softwareImage,
      heroImage: body.heroImage || current.heroImage,
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Failed to update site images config:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}
