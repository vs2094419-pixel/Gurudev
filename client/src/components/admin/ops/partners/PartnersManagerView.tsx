"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { IconButton } from "@/components/admin/IconButton";
import { Switch } from "@/components/admin/Switch";
import { Modal } from "@/components/admin/Modal";
import { FormField } from "@/components/admin/FormField";
import { Input } from "@/components/admin/Input";
import { SingleImageUpload } from "@/components/admin/SingleImageUpload";
import { useToast } from "@/components/admin/Toast";
import {
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  GripIcon,
  CheckIcon,
  CloseIcon,
} from "@/components/admin/icons";
import { card, cx } from "@/components/admin/styles";
import {
  type PartnerCategory,
  type PartnerCompany,
  SVG_LOGO_MAP,
} from "@/lib/partners-config";
import { PartnerLogoRenderer } from "@/components/brand/PartnerLogoRenderer";

interface Props {
  category: PartnerCategory;
  title: string;
  description: string;
  cardPreviewBg?: string; // background color for the logo preview box (default: #0b1528)
}

export function PartnersManagerView({
  category,
  title,
  description,
  cardPreviewBg = "bg-[#0b1528]",
}: Props) {
  const toast = useToast();
  const [items, setItems] = useState<PartnerCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PartnerCompany | null>(null);
  const [formName, setFormName] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");
  const [formSvgKey, setFormSvgKey] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load partners
  const loadPartners = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/partners?category=${category}`);
      const json = await res.json();
      if (json.success && json.data) {
        setItems(json.data);
      }
    } catch {
      toast.error("Failed to load partner companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, [category]);

  // Open modal for add
  const handleAddNew = () => {
    setEditingItem(null);
    setFormName("");
    setFormLogoUrl("");
    setFormSvgKey("");
    setFormActive(true);
    setModalOpen(true);
  };

  // Open modal for edit
  const handleEdit = (partner: PartnerCompany) => {
    setEditingItem(partner);
    setFormName(partner.name);
    setFormLogoUrl(partner.logoUrl || "");
    setFormSvgKey(partner.svgKey || "");
    setFormActive(partner.isActive);
    setModalOpen(true);
  };

  // Save (Create or Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Company name is required");
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        // PATCH
        const res = await fetch(`/api/admin/partners/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            logoUrl: formLogoUrl.trim() || undefined,
            svgKey: formSvgKey.trim() || undefined,
            isActive: formActive,
          }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success(`Updated ${formName}`);
          setModalOpen(false);
          loadPartners();
        } else {
          toast.error(json.error || "Failed to update company");
        }
      } else {
        // POST
        const res = await fetch("/api/admin/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            category,
            logoUrl: formLogoUrl.trim() || undefined,
            svgKey: formSvgKey.trim() || undefined,
            isActive: formActive,
          }),
        });
        const json = await res.json();
        if (json.success) {
          toast.success(`Added ${formName}`);
          setModalOpen(false);
          loadPartners();
        } else {
          toast.error(json.error || "Failed to add company");
        }
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  // Toggle active inline
  const handleToggle = async (partner: PartnerCompany) => {
    const nextActive = !partner.isActive;
    // Optimistic update
    setItems((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, isActive: nextActive } : p))
    );

    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error("Failed to update status");
        loadPartners();
      } else {
        toast.success(nextActive ? `“${partner.name}” is live` : `“${partner.name}” is hidden`);
      }
    } catch {
      toast.error("Network error");
      loadPartners();
    }
  };

  // Move position
  const handleMove = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);

    // Renumber sortOrder
    const reordered = copy.map((p, idx) => ({ ...p, sortOrder: idx + 1 }));
    setItems(reordered);

    try {
      await fetch("/api/admin/partners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, items: reordered }),
      });
      toast.success("Order updated");
    } catch {
      toast.error("Failed to save reorder");
      loadPartners();
    }
  };

  // Delete
  const handleDelete = async (partner: PartnerCompany) => {
    if (!window.confirm(`Delete ${partner.name} from ${category}?`)) return;

    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Deleted ${partner.name}`);
        setItems((prev) => prev.filter((p) => p.id !== partner.id));
      } else {
        toast.error(json.error || "Failed to delete");
      }
    } catch {
      toast.error("Network error");
    }
  };

  // Filter
  const filtered = items.filter((item) => {
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase().trim())) {
      return false;
    }
    if (statusFilter === "active" && !item.isActive) return false;
    if (statusFilter === "hidden" && item.isActive) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button
            variant="primary"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={handleAddNew}
          >
            Add New Company
          </Button>
        }
      />

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex flex-1 items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name…"
            className="w-full sm:max-w-xs rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#f9b233] focus:bg-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#f9b233]"
          >
            <option value="all">Any status</option>
            <option value="active">Active only</option>
            <option value="hidden">Hidden only</option>
          </select>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {items.length} companies
        </p>
      </div>

      {/* Card Grid (like Banners page in screenshot) */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
          <p className="font-display text-lg font-bold text-slate-800">No companies found</p>
          <p className="text-xs text-slate-500">
            {search ? "Try clearing your search query." : "Click '+ Add New Company' to add the first brand logo."}
          </p>
          <Button variant="primary" onClick={handleAddNew}>
            Add Company
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner, index) => (
            <div
              key={partner.id}
              className={cx(
                card,
                "flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md",
                !partner.isActive && "opacity-75 bg-slate-50"
              )}
            >
              {/* Card Preview Container */}
              <div className="relative">
                <div
                  className={`flex aspect-[16/8] w-full items-center justify-center p-6 ${cardPreviewBg} shadow-inner transition-colors`}
                >
                  <PartnerLogoRenderer
                    partner={partner}
                    color="#ffffff"
                    className="h-9 sm:h-10 max-h-12 max-w-[170px] w-auto drop-shadow-sm"
                  />
                </div>

                {/* Position Badge (#1, #2) */}
                <span className="absolute top-2.5 left-2.5 rounded-full bg-[#0b1528]/85 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                  #{partner.sortOrder}
                </span>

                {/* Grip indicator */}
                <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-slate-600 shadow-xs">
                  <GripIcon className="h-4 w-4" />
                </span>
              </div>

              {/* Title & Info */}
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">
                    {partner.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {partner.svgKey ? "Vector SVG" : partner.logoUrl ? "Image URL" : "Text Logo"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 capitalize">
                  {category} brand partner displayed on homepage
                </p>
              </div>

              {/* Actions Footer Strip */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Switch
                    size="sm"
                    checked={partner.isActive}
                    onChange={() => handleToggle(partner)}
                  />
                  <span className="text-xs font-semibold text-slate-600">
                    {partner.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <IconButton
                    label="Move Up"
                    disabled={index === 0}
                    onClick={() => handleMove(index, -1)}
                  >
                    <ArrowUpIcon className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    label="Move Down"
                    disabled={index === items.length - 1}
                    onClick={() => handleMove(index, 1)}
                  >
                    <ArrowDownIcon className="h-3.5 w-3.5" />
                  </IconButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(partner)}
                  >
                    Edit
                  </Button>
                  <IconButton
                    label="Delete"
                    variant="danger"
                    onClick={() => handleDelete(partner)}
                  >
                    <TrashIcon className="h-3.5 w-3.5 text-rose-600" />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {modalOpen && (
        <Modal
          open
          onClose={() => setModalOpen(false)}
          size="lg"
          dismissible={!saving}
          title={editingItem ? `Edit “${editingItem.name}”` : `Add New ${category.toUpperCase()} Company`}
          description={`Configure brand logo and display on the Gurudev InfoTech corporate homepage.`}
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="partner-form"
                loading={saving}
              >
                {editingItem ? "Save Changes" : "Add Company"}
              </Button>
            </>
          }
        >
          <form id="partner-form" onSubmit={handleSubmitForm} noValidate className="space-y-4">
            {/* Logo Image File Attachment (No URL Field Needed) */}
            <SingleImageUpload
              label="Attach Company Logo File"
              value={formLogoUrl}
              onChange={(url) => {
                setFormLogoUrl(url);
                if (url) setFormSvgKey("");
              }}
              aspectRatio="1/1"
              previewBg="bg-[#0b1528]"
              hint="Drop or choose company logo file from computer (PNG, SVG, WebP up to 5 MB)."
            />

            <FormField label="Company Name" name="companyName" required>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Fortinet, Asus, Brother…"
                required
              />
            </FormField>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-ink/80 mb-1.5">
                Or Choose Built-in Vector Logo (Optional)
              </label>
              <select
                value={formSvgKey}
                onChange={(e) => {
                  setFormSvgKey(e.target.value);
                  if (e.target.value) setFormLogoUrl("");
                }}
                className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-xs text-ink outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
              >
                <option value="">(Custom / None - use uploaded logo or text badge)</option>
                {Object.keys(SVG_LOGO_MAP).map((k) => (
                  <option key={k} value={k}>
                    {k.toUpperCase()} (Built-in Vector)
                  </option>
                ))}
              </select>
            </div>

            {/* Status Switch */}
            <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-ivory/50 p-3">
              <div>
                <p className="text-xs font-semibold text-ink">Visible on Homepage</p>
                <p className="text-[11px] text-ink/55">Show in {category} section on homepage</p>
              </div>
              <Switch checked={formActive} onChange={setFormActive} />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
