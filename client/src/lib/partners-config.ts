import React from "react";
import defaultPartners from "./partners.json";
import {
  HpLogo,
  LenovoLogo,
  DellLogo,
  ApcLogo,
  ToshibaLogo,
  AppleLogo,
  CiscoLogo,
  LogitechLogo,
  NetAppLogo,
  AcerLogo,
  SamsungLogo,
  MaxhubLogo,
  MolexLogo,
  SchneiderLogo,
  DLinkLogo,
  NetgearLogo,
  RacksAccessoriesLogo,
  MicrosoftLogo,
  AdobeLogo,
  SymantecLogo,
  TallyLogo,
  LinuxLogo,
  OtherSoftwaresLogo,
} from "@/components/brand/BrandLogos";

export type PartnerCategory = "hardware" | "networking" | "software";

export interface PartnerCompany {
  id: string;
  name: string;
  category: PartnerCategory;
  logoUrl?: string;
  svgKey?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PartnersStore {
  hardware: PartnerCompany[];
  networking: PartnerCompany[];
  software: PartnerCompany[];
}

export const SVG_LOGO_MAP: Record<string, React.ComponentType<{ className?: string; color?: string }>> = {
  hp: HpLogo,
  lenovo: LenovoLogo,
  dell: DellLogo,
  apc: ApcLogo,
  toshiba: ToshibaLogo,
  apple: AppleLogo,
  cisco: CiscoLogo,
  logitech: LogitechLogo,
  netapp: NetAppLogo,
  acer: AcerLogo,
  samsung: SamsungLogo,
  maxhub: MaxhubLogo,
  molex: MolexLogo,
  schneider: SchneiderLogo,
  dlink: DLinkLogo,
  netgear: NetgearLogo,
  racks: RacksAccessoriesLogo,
  microsoft: MicrosoftLogo,
  adobe: AdobeLogo,
  symantec: SymantecLogo,
  tally: TallyLogo,
  linux: LinuxLogo,
  "other-softwares": OtherSoftwaresLogo,
};

export const DEFAULT_PARTNERS: PartnersStore = {
  hardware: (defaultPartners.hardware || []).map((p) => ({ ...p, category: "hardware" as PartnerCategory })),
  networking: (defaultPartners.networking || []).map((p) => ({ ...p, category: "networking" as PartnerCategory })),
  software: (defaultPartners.software || []).map((p) => ({ ...p, category: "software" as PartnerCategory })),
};
