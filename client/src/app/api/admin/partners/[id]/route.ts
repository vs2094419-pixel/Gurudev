import { NextResponse, type NextRequest } from "next/server";
import { getPartnersStore, savePartnersStore } from "@/lib/partners-db";
import type { PartnerCategory } from "@/lib/partners-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await req.json();
    const store = await getPartnersStore();
    let found = false;

    for (const cat of ["hardware", "networking", "software"] as PartnerCategory[]) {
      const list = store[cat] || [];
      const index = list.findIndex((p) => p.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        found = true;
        break;
      }
    }

    if (!found) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }

    await savePartnersStore(store);
    return NextResponse.json({ success: true, message: "Partner updated" });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const store = await getPartnersStore();
    let found = false;

    for (const cat of ["hardware", "networking", "software"] as PartnerCategory[]) {
      const list = store[cat] || [];
      const index = list.findIndex((p) => p.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        // renumber sortOrder
        list.forEach((item, idx) => {
          item.sortOrder = idx + 1;
        });
        found = true;
        break;
      }
    }

    if (!found) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }

    await savePartnersStore(store);
    return NextResponse.json({ success: true, message: "Partner deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
