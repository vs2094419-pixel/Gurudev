import { PartnersManagerView } from "@/components/admin/ops/partners/PartnersManagerView";

export const metadata = { title: "Hardware Partners" };

export default function HardwareAdminPage() {
  return (
    <PartnersManagerView
      category="hardware"
      title="Hardware Brand Partners"
      description="Manage the hardware brand partner company logos displayed on the homepage Section 5 (Our Products – Hardware)."
      cardPreviewBg="bg-[#0b1528]"
    />
  );
}
