import defaultImages from "./site-images.json";

export interface SiteImagesConfig {
  siteLogo: string;
  aboutImage: string;
  staffingImage: string;
  supportImage: string;
  softwareImage: string;
  heroImage: string;
}

export const SITE_IMAGES: SiteImagesConfig = {
  siteLogo: (defaultImages as Record<string, string>).siteLogo || "/brand/logo.svg",
  aboutImage: defaultImages.aboutImage || "/images/corporate/about-team.png",
  staffingImage: defaultImages.staffingImage || "/images/corporate/about-team.png",
  supportImage: defaultImages.supportImage || "/images/corporate/tech-support.jpg",
  softwareImage: defaultImages.softwareImage || "/images/corporate/software-coding.jpg",
  heroImage: defaultImages.heroImage || "/images/corporate/server-rack.jpg",
};
