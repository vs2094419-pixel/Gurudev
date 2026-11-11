import React from "react";

interface LogoProps {
  className?: string;
  color?: string; // e.g. "currentColor", "#ffffff", "#0b1528"
}

// ──────────────────────────────────────────────
// HARDWARE LOGOS
// ──────────────────────────────────────────────

export function HpLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="100" height="100" className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="5" />
      <g transform="skewX(-18) translate(14, 0)">
        {/* 'h' stem and arch */}
        <path d="M42 22 V78 M42 48 C42 40 50 38 56 38 V78" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        {/* 'p' stem and bowl */}
        <path d="M68 38 V88 M68 40 C75 40 82 46 82 56 C82 66 75 72 68 72" stroke={color} strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LenovoLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="160" height="40" className={className} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="30" fill={color} fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="32" letterSpacing="-1">
        Lenovo
      </text>
    </svg>
  );
}

export function DellLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="100" height="100" className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="5.5" />
      {/* DELL text with tilted E */}
      <text x="20" y="61" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="32">D</text>
      <g transform="rotate(-28 50 50)">
        <text x="44" y="58" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="30">E</text>
      </g>
      <text x="59" y="61" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="32">L</text>
      <text x="73" y="61" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="32">L</text>
    </svg>
  );
}

export function ApcLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="130" height="40" className={className} viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <path d="M5 34 L18 6 H30 L43 34 H31 L28 27 H19 L16 34 H5 Z M24 16 L20 23 H27 L24 16 Z" />
        <path d="M46 6 H66 C73 6 78 10 78 17 C78 24 73 28 66 28 H57 V34 H46 V6 Z M57 15 V19 H65 C67 19 68 18 68 17 C68 16 67 15 65 15 H57 Z" />
        <path d="M106 13 C103 8 98 6 92 6 C81 6 74 14 74 20 C74 26 81 34 92 34 C99 34 104 31 107 26 L98 22 C96 25 94 26 91 26 C86 26 83 23 83 20 C83 17 86 14 91 14 C94 14 96 15 97 18 L106 13 Z" />
      </g>
      <text x="110" y="34" fill={color} fontSize="8" fontFamily="sans-serif">by Schneider</text>
    </svg>
  );
}

export function ToshibaLogo({ className = "h-6 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="170" height="30" className={className} viewBox="0 0 170 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="24" fill={color} fontFamily="'Inter', 'Arial Black', sans-serif" fontWeight="900" fontSize="26" letterSpacing="1">
        TOSHIBA
      </text>
    </svg>
  );
}

export function AppleLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="170" height="170" className={className} viewBox="0 0 170 170" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.93-12.01-14.54-6.02-9.23-10.8-19.57-14.34-31.02-3.53-11.45-5.3-22.13-5.3-32.04 0-14.78 3.78-26.96 11.35-36.54 7.57-9.58 17.06-14.46 28.47-14.64 4.8 0 10.15 1.25 16.05 3.77 5.9 2.51 9.77 3.84 11.61 3.99 1.48-.15 5.51-1.55 12.1-4.2 6.58-2.65 12.28-3.79 17.08-3.41 12.98.63 23.3 5.37 30.98 14.23-11.35 6.84-16.92 16.33-16.71 28.47.21 9.8 4.09 18 11.63 24.6 7.54 6.6 16.36 10.42 26.47 11.45-2.61 7.69-5.74 15.02-9.4 21.98zM119.22 31.81c0-7.23 2.65-14.07 7.95-20.52 5.3-6.45 11.83-10.44 19.59-11.97.21 1.28.32 2.4.32 3.35 0 7.23-2.73 14.28-8.2 21.16-5.46 6.88-12.08 10.74-19.86 11.59-.21-1.07-.32-2.28-.32-3.61z" />
    </svg>
  );
}

export function CiscoLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="110" height="50" className={className} viewBox="0 0 110 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 9 vertical bridge bars */}
      <g fill={color}>
        <rect x="15" y="16" width="3.5" height="10" rx="1.75" />
        <rect x="25" y="10" width="3.5" height="16" rx="1.75" />
        <rect x="35" y="4"  width="3.5" height="22" rx="1.75" />
        <rect x="45" y="10" width="3.5" height="16" rx="1.75" />
        <rect x="55" y="0"  width="3.5" height="26" rx="1.75" />
        <rect x="65" y="10" width="3.5" height="16" rx="1.75" />
        <rect x="75" y="4"  width="3.5" height="22" rx="1.75" />
        <rect x="85" y="10" width="3.5" height="16" rx="1.75" />
        <rect x="95" y="16" width="3.5" height="10" rx="1.75" />
      </g>
      <text x="55" y="44" textAnchor="middle" fill={color} fontFamily="'Inter', system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="3">
        CISCO
      </text>
    </svg>
  );
}

export function LogitechLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="150" height="40" className={className} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="4" />
      <circle cx="20" cy="20" r="4.5" fill={color} />
      <text x="44" y="27" fill={color} fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="22" letterSpacing="0.5">
        logitech
      </text>
    </svg>
  );
}

export function NetAppLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="140" height="40" className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* NetApp Arch Icon */}
      <path d="M6 32 V8 H18 V20 H28 V8 H40 V32 H28 V28 H18 V32 H6 Z" fill={color} />
      <text x="48" y="27" fill={color} fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="22">
        NetApp
      </text>
    </svg>
  );
}

export function AcerLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="110" height="35" className={className} viewBox="0 0 110 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="26" fill={color} fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5">
        acer
      </text>
    </svg>
  );
}

export function SamsungLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="170" height="35" className={className} viewBox="0 0 170 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="26" fill={color} fontFamily="'Inter', 'Arial Black', sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
        SAMSUNG
      </text>
    </svg>
  );
}

export function MaxhubLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="160" height="38" className={className} viewBox="0 0 160 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" fill={color} fontFamily="'Inter', 'Arial Black', sans-serif" fontWeight="900" fontSize="26" letterSpacing="1">
        MAXHUB
      </text>
      <circle cx="150" cy="12" r="4" fill="#00c0f3" />
    </svg>
  );
}

// ──────────────────────────────────────────────
// NETWORKING & CABLING LOGOS
// ──────────────────────────────────────────────

export function MolexLogo({ className = "h-10 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="150" height="60" className={className} viewBox="0 0 150 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer oval ring */}
      <ellipse cx="65" cy="30" rx="36" ry="26" stroke={color} strokeWidth="3" />
      <text x="65" y="37" textAnchor="middle" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="22" letterSpacing="0.5">
        molex®
      </text>
    </svg>
  );
}

export function SchneiderLogo({ className = "h-9 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="180" height="50" className={className} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4, 6)">
        {/* Schneider stylized leaf emblem */}
        <path d="M12 2 C18 10 24 20 18 30 C12 26 8 20 12 2 Z" fill={color} />
        <path d="M18 12 C24 18 26 24 20 30 C20 22 20 16 18 12 Z" fill={color} opacity="0.8" />
        <text x="32" y="20" fill={color} fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.5">
          Schneider
        </text>
        <text x="50" y="33" fill={color} fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="13" letterSpacing="1.5">
          Electric
        </text>
      </g>
    </svg>
  );
}

export function DLinkLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="140" height="40" className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="28" fill={color} fontFamily="'Inter', 'Trebuchet MS', sans-serif" fontWeight="900" fontSize="28" letterSpacing="0.5">
        D-Link
      </text>
    </svg>
  );
}

export function NetgearLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="160" height="35" className={className} viewBox="0 0 160 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="25" fill={color} fontFamily="'Inter', 'Arial Black', sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
        NETGEAR®
      </text>
    </svg>
  );
}

export function RacksAccessoriesLogo({ className = "h-9 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="180" height="45" className={className} viewBox="0 0 180 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="18" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">
        RACKS &amp;
      </text>
      <text x="5" y="36" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">
        ACCESSORIES
      </text>
    </svg>
  );
}

// ──────────────────────────────────────────────
// SOFTWARE LOGOS
// ──────────────────────────────────────────────

export function MicrosoftLogo({ className = "h-7 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="150" height="36" className={className} viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 6)">
        <rect x="0" y="0" width="11" height="11" fill={color} />
        <rect x="13" y="0" width="11" height="11" fill={color} />
        <rect x="0" y="13" width="11" height="11" fill={color} />
        <rect x="13" y="13" width="11" height="11" fill={color} />
      </g>
      <text x="36" y="24" fill={color} fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="600" fontSize="20">
        Microsoft
      </text>
    </svg>
  );
}

export function AdobeLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="130" height="40" className={className} viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Adobe Stylized Triangle Logo */}
      <g transform="translate(6, 4)">
        <path d="M0 0 L10 28 H20 L10 0 Z" fill={color} />
        <path d="M28 0 L18 28 H8 L18 0 Z" fill={color} />
        <path d="M14 12 L19 25 H9 Z" fill={color} />
      </g>
      <text x="44" y="27" fill={color} fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="24" letterSpacing="1">
        Adobe
      </text>
    </svg>
  );
}

export function SymantecLogo({ className = "h-8 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="150" height="40" className={className} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Symantec check circle icon */}
      <circle cx="18" cy="20" r="14" stroke={color} strokeWidth="3" />
      <path d="M11 20 L16 25 L26 14" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="38" y="26" fill={color} fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20">
        Symantec.
      </text>
    </svg>
  );
}

export function TallyLogo({ className = "h-9 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="160" height="48" className={className} viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="28" fill={color} fontFamily="'Brush Script MT', 'Segoe Script', cursive, sans-serif" fontStyle="italic" fontWeight="700" fontSize="32">
        Tally
      </text>
      <text x="5" y="42" fill={color} fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="2.5">
        POWER OF SIMPLICITY
      </text>
    </svg>
  );
}

export function LinuxLogo({ className = "h-9 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="130" height="45" className={className} viewBox="0 0 130 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Linux Tux Silhouette */}
      <g transform="translate(6, 4)">
        <ellipse cx="14" cy="18" rx="10" ry="14" fill={color} opacity="0.9" />
        <ellipse cx="14" cy="19" rx="6" ry="10" fill="#0B1528" opacity="0.3" />
        <ellipse cx="14" cy="8" rx="6" ry="6" fill={color} />
        <ellipse cx="12" cy="7" rx="1.5" ry="2" fill="#0B1528" />
        <ellipse cx="16" cy="7" rx="1.5" ry="2" fill="#0B1528" />
        <path d="M11 10 Q14 13 17 10" stroke="#f9b233" strokeWidth="2" fill="none" />
        <ellipse cx="8" cy="30" rx="5" ry="2" fill="#f9b233" />
        <ellipse cx="20" cy="30" rx="5" ry="2" fill="#f9b233" />
      </g>
      <text x="38" y="27" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="22" letterSpacing="0.5">
        Linux™
      </text>
    </svg>
  );
}

export function OtherSoftwaresLogo({ className = "h-9 w-auto", color = "currentColor" }: LogoProps) {
  return (
    <svg width="170" height="45" className={className} viewBox="0 0 170 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="18" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" letterSpacing="1.5">
        OTHER
      </text>
      <text x="5" y="32" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
        CUSTOMIZED
      </text>
      <text x="5" y="44" fill={color} fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12" letterSpacing="1">
        SOFTWARES
      </text>
    </svg>
  );
}
