export const BRAND = {
  name: "GURUDEV INFOTECH",
  tagline: "Total IT Solutions Since 1998",
  phone: "+91 98803 77772",
  phoneSecondary: "+91 98803 16281",
  phoneDisplay: "+91 98803 77772, +91 98803 16281",
  phones: ["+91 98803 77772", "+91 98803 16281"],
  email: "info@gurudevinfotech.com",
  address: "1st Floor, GURUDEV INFOTECH, 102, Gangamma Temple St, Ashok Nagar, Bengaluru, Karnataka 560050",
  addressShort: "102, Gangamma Temple St, Ashok Nagar, Bengaluru 560050",
  mapsUrl: "https://maps.app.goo.gl/YdfX6oYaNtGP5x5N7",
  mapsEmbedUrl: "https://maps.google.com/maps?q=1st+Floor,+GURUDEV+INFOTECH,+102,+Gangamma+Temple+St,+Ashok+Nagar,+Bengaluru,+Karnataka+560050&t=&z=16&ie=UTF8&iwloc=&output=embed",
  logo: "/brand/logo.svg",
  logoDark: "/brand/logo.svg",
  logoLight: "/brand/logo-light.svg",
  logoOriginal: "/brand/logo.svg",
};

/** Storefront / Corporate IT navigation links */
export const NAV_CATEGORIES = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Hardware", href: "/#hardware" },
  { label: "Networking", href: "/#networking" },
  { label: "Support", href: "/#support" },
  { label: "Softwares", href: "/#softwares" },
];

export const NAV_LINKS = [
  ...NAV_CATEGORIES,
  { label: "Contact Us", href: "/contact" },
];

export const ORDER_STATUS_LABEL = {
  PLACED: "Order Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;
