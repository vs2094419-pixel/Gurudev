import fs from "fs";
import path from "path";
import defaultPartners from "./partners.json";
import type { PartnersStore } from "./partners-config";
import { prisma } from "@/server/lib/prisma";

const PARTNERS_FILE = path.join(process.cwd(), "src", "lib", "partners.json");
const BANNER_KEY = "__partners_data__";

let memoryPartners: PartnersStore | null = null;

export async function getPartnersStore(): Promise<PartnersStore> {
  // 1. Try DB first (persists across serverless cold starts on Vercel)
  try {
    const row = await prisma.banner.findFirst({
      where: { title: BANNER_KEY },
    });
    if (row?.subtitle) {
      const parsed = JSON.parse(row.subtitle) as Partial<PartnersStore>;
      return {
        hardware: parsed.hardware || (defaultPartners as PartnersStore).hardware,
        networking: parsed.networking || (defaultPartners as PartnersStore).networking,
        software: parsed.software || (defaultPartners as PartnersStore).software,
      };
    }
  } catch (err) {
    console.warn("Could not read partners from DB, falling back to static/memory:", err);
  }

  // 2. Memory cache
  if (memoryPartners) {
    return memoryPartners;
  }

  // 3. Local filesystem fallback
  try {
    if (fs.existsSync(PARTNERS_FILE)) {
      const data = fs.readFileSync(PARTNERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Expected on serverless
  }

  return defaultPartners as PartnersStore;
}

export async function savePartnersStore(data: PartnersStore): Promise<boolean> {
  // 1. Memory cache
  memoryPartners = data;

  // 2. Save to DB
  try {
    const existing = await prisma.banner.findFirst({
      where: { title: BANNER_KEY },
    });
    if (existing) {
      await prisma.banner.update({
        where: { id: existing.id },
        data: {
          subtitle: JSON.stringify(data),
          isActive: false,
        },
      });
    } else {
      await prisma.banner.create({
        data: {
          title: BANNER_KEY,
          imageUrl: "/brand/logo.png",
          subtitle: JSON.stringify(data),
          sortOrder: -998,
          isActive: false,
        },
      });
    }
  } catch (err) {
    console.warn("Could not save partners to DB:", err);
  }

  // 3. Local file write (dev only; don't throw on Vercel)
  try {
    if (fs.existsSync(path.dirname(PARTNERS_FILE))) {
      fs.writeFileSync(PARTNERS_FILE, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch {
    // Silent on Vercel
  }

  return true;
}
