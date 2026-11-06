import { PartnersManagerView } from "@/components/admin/ops/partners/PartnersManagerView";

export const metadata = { title: "Networking & Cabling Brands" };

export default function NetworkingAdminPage() {
  return (
    <PartnersManagerView
      category="networking"
      title="Networking & Structured Cabling Brands"
      description="Manage the networking and cabling partner company logos displayed on the homepage Section 6 (Golden Yellow card)."
      cardPreviewBg="bg-[#f9b233]"
    />
  );
}
