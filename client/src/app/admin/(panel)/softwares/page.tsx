import { PartnersManagerView } from "@/components/admin/ops/partners/PartnersManagerView";

export const metadata = { title: "Software Vendors" };

export default function SoftwaresAdminPage() {
  return (
    <PartnersManagerView
      category="software"
      title="Software Brands & Vendors"
      description="Manage the software brand logos displayed on the homepage Section 8 (Softwares horizontal strip)."
      cardPreviewBg="bg-[#0f1738]"
    />
  );
}
