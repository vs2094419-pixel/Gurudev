import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultPartners from "@/lib/partners.json";
import type { PartnersStore } from "@/lib/partners-config";

const PARTNERS_FILE = path.join(process.cwd(), "src", "lib", "partners.json");

function getPartners(): PartnersStore {
  try {
    if (fs.existsSync(PARTNERS_FILE)) {
      const data = fs.readFileSync(PARTNERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading partners.json:", err);
  }
  return defaultPartners as PartnersStore;
}

export async function GET() {
  const all = getPartners();
  // Filter active and sort
  const active = {
    hardware: (all.hardware || []).filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder),
    networking: (all.networking || []).filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder),
    software: (all.software || []).filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder),
  };
  return NextResponse.json({ success: true, data: active }, {
    headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60" }
  });
}
