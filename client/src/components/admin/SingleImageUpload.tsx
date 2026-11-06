"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { upload, validateImageFile } from "@/lib/admin/upload";
import { UploadIcon, TrashIcon, Spinner, WarningIcon } from "@/components/admin/icons";
import { Button } from "@/components/admin/Button";

interface SingleImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  previewBg?: string;
}

export function SingleImageUpload({
  label = "Image",
  value,
  onChange,
  hint = "JPEG, PNG, WebP, AVIF or SVG (up to 5 MB)",
  aspectRatio = "16/9",
  previewBg = "bg-slate-900",
}: SingleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-[16/9]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "1/1"
      ? "aspect-square"
      : "aspect-[16/9]";

  const handleProcessFile = async (file: File) => {
    setError(null);
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    try {
      // 1. Upload to server/Cloudinary
      const items = await upload([file]);
      if (items && items.length > 0 && items[0].url) {
        onChange(items[0].url);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err: unknown) {
      console.warn("Server upload failed, converting to local data preview fallback:", err);
      // Fallback: Read as base64 so user's work is NEVER lost
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          onChange(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleProcessFile(file);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleProcessFile(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold tracking-wide text-ink/80">
          {label}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* If an image is currently selected */}
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-ink/15 bg-white p-3 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Live Preview Box */}
            <div
              className={`relative ${aspectClass} w-full sm:w-56 shrink-0 rounded-lg overflow-hidden border border-ink/10 ${previewBg}`}
            >
              <Image
                src={value}
                alt="Preview"
                fill
                unoptimized
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 224px"
              />
              <span className="absolute top-2 left-2 rounded-full bg-ink/85 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#f9b233] uppercase">
                Current
              </span>
            </div>

            {/* Action Buttons & Info */}
            <div className="flex-1 w-full space-y-3">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Image attached and ready
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click below to choose a different photo or remove this one.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon className="h-4 w-4 mr-1.5" />
                  {uploading ? "Uploading..." : "Replace Photo"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={uploading}
                  onClick={() => onChange("")}
                  className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  <TrashIcon className="h-4 w-4 mr-1 text-rose-500" />
                  Remove
                </Button>
              </div>

              {/* Drag over replacement hint */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`rounded-lg border border-dashed px-3 py-2 text-center text-[11px] transition-colors cursor-pointer ${
                  dragOver
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                Or drop a new photo file here to instantly replace
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Dropzone State */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-emerald-500 bg-emerald-50/60"
              : "border-ink/20 bg-ivory/60 hover:border-ink/40 hover:bg-ivory"
          }`}
        >
          <span className="grid size-12 place-items-center rounded-full bg-white text-emerald-700 ring-1 ring-ink/10 shadow-xs">
            {uploading ? <Spinner className="size-6 text-emerald-600" /> : <UploadIcon className="size-6" />}
          </span>

          <div>
            <p className="text-sm font-semibold text-ink">
              {uploading ? "Uploading photo..." : "Drag an image here, or click to choose from computer"}
            </p>
            <p className="mt-1 text-xs text-ink/55">{hint}</p>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={uploading}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {uploading ? "Uploading..." : "Choose Image File"}
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-2 text-xs text-rose-700">
          <WarningIcon className="size-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
