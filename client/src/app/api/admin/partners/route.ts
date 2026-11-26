import { NextResponse, type NextRequest } from "next/server";
import { getPartnersStore, savePartnersStore } from "@/lib/partners-db";
import type { PartnerCompany, PartnerCategory } from "@/lib/partners-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as PartnerCategory | null;
  const store = await getPartnersStore();

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

    const store = await getPartnersStore();
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

    await savePartnersStore(store);
    return NextResponse.json({ success: true, data: newPartner });
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

    const store = await getPartnersStore();
    store[category] = items.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    await savePartnersStore(store);
    return NextResponse.json({ success: true, data: store[category] });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
