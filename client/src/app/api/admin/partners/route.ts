import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import defaultPartners from "@/lib/partners.json";
import type { PartnersStore, PartnerCompany, PartnerCategory } from "@/lib/partners-config";

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as PartnerCategory | null;
  const store = getPartners();

  if (category && store[category]) {
    return NextResponse.json({
      success: true,
      category,
      data: store[category].sort((a, b) => a.sortOrder - b.sortOrder),
    }, { headers: { "Cache-Control": "private, no-store" } });
  }

  return NextResponse.json({ success: true, data: store }, {
    headers: { "Cache-Control": "private, no-store" }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, logoUrl, svgKey, isActive } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Company name is required" }, { status: 400 });
    }

    const validCategory: PartnerCategory =
      category === "networking" || category === "software" ? category : "hardware";

    const store = getPartners();
    const list = store[validCategory] || [];

    const newPartner: PartnerCompany = {
      id: `${validCategory}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      category: validCategory,
      logoUrl: logoUrl?.trim() || undefined,
      svgKey: svgKey?.trim() || undefined,
      isActive: isActive !== false,
      sortOrder: list.length + 1,
    };

    list.push(newPartner);
    store[validCategory] = list;

    if (savePartners(store)) {
      return NextResponse.json({ success: true, data: newPartner });
    }
    return NextResponse.json({ success: false, error: "Failed to persist partner" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, items } = body as { category: PartnerCategory; items: PartnerCompany[] };

    if (!category || !items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    const store = getPartners();
    store[category] = items.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    if (savePartners(store)) {
      return NextResponse.json({ success: true, data: store[category] });
    }
    return NextResponse.json({ success: false, error: "Failed to save reorder" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
