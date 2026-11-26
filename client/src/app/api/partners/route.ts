import { NextResponse } from "next/server";
import { getPartnersStore } from "@/lib/partners-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const all = await getPartnersStore();
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
