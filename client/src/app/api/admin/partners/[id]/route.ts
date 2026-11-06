import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import defaultPartners from "@/lib/partners.json";
import type { PartnersStore, PartnerCategory } from "@/lib/partners-config";

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

function savePartners(data: PartnersStore): boolean {
  try {
    fs.writeFileSync(PARTNERS_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing partners.json:", err);
    return false;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await req.json();
    const store = getPartners();
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

    if (savePartners(store)) {
      return NextResponse.json({ success: true, message: "Partner updated" });
    }
    return NextResponse.json({ success: false, error: "Failed to persist partner" }, { status: 500 });
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
    const store = getPartners();
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

    if (savePartners(store)) {
      return NextResponse.json({ success: true, message: "Partner deleted" });
    }
    return NextResponse.json({ success: false, error: "Failed to persist partner" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
