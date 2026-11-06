"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { Switch } from "@/components/admin/Switch";
import { Modal } from "@/components/admin/Modal";
import { FormField } from "@/components/admin/FormField";
import { Input } from "@/components/admin/Input";
import { SingleImageUpload } from "@/components/admin/SingleImageUpload";
import { useToast } from "@/components/admin/Toast";
import { GripIcon, CheckIcon } from "@/components/admin/icons";
import { card, cx } from "@/components/admin/styles";

interface SectionPhotoItem {
  id: string;
  key: string;
  position: number;
  title: string;
  subtitle: string;
  section: string;
  currentUrl: string;
  isActive: boolean;
  recommendedAspect: "16/9" | "4/3" | "1/1";
}

const PRESET_OPTIONS = [
  { label: "IT Team Collaboration", path: "/images/corporate/about-team.png" },
  { label: "Staffing Office Team", path: "/images/corporate/staffing-team.png" },
  { label: "Technical Support Desk", path: "/images/corporate/tech-support.jpg" },
  { label: "Support Team Office", path: "/images/corporate/support-team.png" },
  { label: "Software Developer Pointing Screen", path: "/images/corporate/software-dev.png" },
  { label: "Enterprise Software Engineering", path: "/images/corporate/software-coding.jpg" },
  { label: "Data Center & Server Rack", path: "/images/corporate/server-rack.jpg" },
  { label: "Modern Corporate IT Office", path: "/images/corporate/it-team.jpg" },
];

export default function SiteImagesPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);

  // Logo state
  const [siteLogo, setSiteLogo] = useState("/brand/emblem.png");

  const [cards, setCards] = useState<SectionPhotoItem[]>([
    {
      id: "aboutImage",
      key: "aboutImage",
      position: 1,
      title: "Section 1 – About Company",
      subtitle: "Professional IT office/team image on the left of the golden-yellow narrative.",
      section: "About Company (Homepage Section 1)",
      currentUrl: "/images/corporate/about-team.png",
      isActive: true,
      recommendedAspect: "16/9",
    },
    {
      id: "staffingImage",
      key: "staffingImage",
      position: 2,
      title: "Section 2 – Staffing Standards",
      subtitle: "Professional office/team image on the right of the Staffing Standards card.",
      section: "Staffing Standards (Homepage Section 2)",
      currentUrl: "/images/corporate/about-team.png",
      isActive: true,
      recommendedAspect: "16/9",
    },
    {
      id: "supportImage",
      key: "supportImage",
      position: 3,
      title: "Section 7 – Support & Services",
      subtitle: "Support engineers and IT service desk image alongside the large red card.",
      section: "Support & Services (Homepage Section 7)",
      currentUrl: "/images/corporate/tech-support.jpg",
      isActive: true,
      recommendedAspect: "4/3",
    },
    {
      id: "softwareImage",
      key: "softwareImage",
      position: 4,
      title: "Section 8 – Softwares & Others",
      subtitle: "Professional software development image on the right of the golden yellow 'Others' list.",
      section: "Softwares & Others (Homepage Section 8)",
      currentUrl: "/images/corporate/software-coding.jpg",
      isActive: true,
      recommendedAspect: "16/9",
    },
    {
      id: "heroImage",
      key: "heroImage",
      position: 5,
      title: "Hero Section – Data Center",
      subtitle: "High-tech server rack & enterprise infrastructure visual on top banner.",
      section: "Hero Section (Homepage Top)",
      currentUrl: "/images/corporate/server-rack.jpg",
      isActive: true,
      recommendedAspect: "1/1",
    },
  ]);

  // Modal edit state
  const [editingCard, setEditingCard] = useState<SectionPhotoItem | null>(null);
  const [modalUrl, setModalUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-images")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          if (json.data.siteLogo) {
            setSiteLogo(json.data.siteLogo);
          }
          setCards((prev) =>
            prev.map((c) => ({
              ...c,
              currentUrl: json.data[c.key] || c.currentUrl,
            }))
          );
        }
      })
      .catch((err) => console.error("Failed to load images:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleEditClick = (cardItem: SectionPhotoItem) => {
    setEditingCard(cardItem);
    setModalUrl(cardItem.currentUrl);
    setModalTitle(cardItem.title);
  };

  const handleModalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    if (!modalUrl.trim()) {
      toast.error("Please attach an image or pick a corporate preset photo.");
      return;
    }

    const nextCards = cards.map((c) =>
      c.id === editingCard.id ? { ...c, currentUrl: modalUrl.trim(), title: modalTitle.trim() || c.title } : c
    );
    setCards(nextCards);
    setEditingCard(null);

    // Save to server
    await saveToServer(nextCards);
  };

  const handleToggleActive = async (cardItem: SectionPhotoItem) => {
    const nextCards = cards.map((c) =>
      c.id === cardItem.id ? { ...c, isActive: !c.isActive } : c
    );
    setCards(nextCards);
    toast.success(cardItem.isActive ? `“${cardItem.title}” hidden` : `“${cardItem.title}” active`);
  };

  const saveToServer = async (cardList: SectionPhotoItem[]) => {
    setSaving(true);
    try {
      const payload: Record<string, string> = { siteLogo };
      cardList.forEach((c) => {
        payload[c.key] = c.currentUrl;
      });

      const res = await fetch("/api/admin/site-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Section photo updated and published to homepage!");
      } else {
        toast.error("Failed to update section photo");
      }
    } catch {
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLogo = async () => {
    setSavingLogo(true);
    try {
      const res = await fetch("/api/admin/site-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteLogo }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Website Logo updated successfully!");
      } else {
        toast.error("Failed to update logo");
      }
    } catch {
      toast.error("An error occurred while saving logo");
    } finally {
      setSavingLogo(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Site Media & Photos"
        description="Manage the primary corporate photos and website branding. Attach photo files directly from your computer."
      />

      {/* Website Logo Management Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Website Logo &amp; Branding
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              This logo is displayed in the website header, footer, mobile navigation, and browser favicon.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            loading={savingLogo}
            onClick={handleSaveLogo}
          >
            <CheckIcon className="h-4 w-4 mr-1.5" />
            Save &amp; Apply Logo
          </Button>
        </div>

        <div className="max-w-xl">
          <SingleImageUpload
            label="Upload Custom Website Logo"
            value={siteLogo}
            onChange={setSiteLogo}
            aspectRatio="16/9"
            previewBg="bg-white"
            hint="Attach horizontal logo or emblem (PNG, SVG, or WebP up to 5 MB)."
          />
        </div>
      </div>

      {/* Section Photos Header */}
      <div className="space-y-1">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Homepage Section Photos
        </h2>
        <p className="text-xs text-slate-500">
          The main photos displayed across each homepage narrative card. Click &quot;Edit Photo&quot; to attach a new file from your computer.
        </p>
      </div>

      {/* Card Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item) => (
            <div
              key={item.id}
              className={cx(
                card,
                "flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md",
                !item.isActive && "opacity-75 bg-slate-50"
              )}
            >
              {/* Preview Thumbnail Container */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={item.currentUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Position Badge (#1, #2...) */}
                <span className="absolute top-2.5 left-2.5 rounded-full bg-[#0b1528]/85 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                  #{item.position}
                </span>

                {/* Grip indicator */}
                <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-slate-700 shadow-xs">
                  <GripIcon className="h-4 w-4" />
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 space-y-1">
                <p className="font-display text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
                <p className="text-[11px] text-[#d92525] font-semibold pt-1">
                  Location: <span className="text-slate-600">{item.section}</span>
                </p>
              </div>

              {/* Actions Footer Strip */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Switch
                    size="sm"
                    checked={item.isActive}
                    onChange={() => handleToggleActive(item)}
                  />
                  <span className="text-xs font-semibold text-slate-600">
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit Photo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Photo Modal with Working Direct Attachment (No Photo URL Required) */}
      {editingCard && (
        <Modal
          open
          onClose={() => setEditingCard(null)}
          size="lg"
          dismissible={!saving}
          title={`Edit photo`}
          description={`Section #${editingCard.position}: ${editingCard.title}. Shown in ${editingCard.section}.`}
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setEditingCard(null)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="photo-edit-form"
                loading={saving}
              >
                Save changes
              </Button>
            </>
          }
        >
          <form
            id="photo-edit-form"
            onSubmit={handleModalSave}
            noValidate
            className="space-y-5"
          >
            {/* Direct Image Attachment Dropzone */}
            <SingleImageUpload
              label="Attach or Replace Section Photo"
              value={modalUrl}
              onChange={setModalUrl}
              aspectRatio={editingCard.recommendedAspect}
              hint="Drop image file here or click to browse (JPEG, PNG, WebP up to 5 MB)."
            />

            <FormField label="Card Title" name="modalTitle">
              <Input
                value={modalTitle}
                maxLength={150}
                onChange={(e) => setModalTitle(e.target.value)}
              />
            </FormField>

            {/* Quick Select Presets */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold tracking-wide text-ink/80 mb-2">
                Or Pick from Curated Corporate Photos
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto rounded-xl border border-ink/10 p-2 bg-ivory/40">
                {PRESET_OPTIONS.map((opt) => (
                  <button
                    key={opt.path}
                    type="button"
                    onClick={() => setModalUrl(opt.path)}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                      modalUrl === opt.path
                        ? "border-[#d92525] bg-rose-50/70 text-[#d92525] font-bold ring-1 ring-[#d92525]"
                        : "border-ink/10 bg-white text-ink/80 hover:bg-ivory"
                    }`}
                  >
                    <div className="relative h-7 w-11 shrink-0 rounded overflow-hidden">
                      <Image
                        src={opt.path}
                        alt={opt.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
