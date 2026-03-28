"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import {
  compressManyInOrder,
  getCompressionPlan,
  isAllowed,
} from "@/lib/image";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ToolsPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [quality, setQuality] = useState(0.86);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<File[] | null>(null);
  const [downloadLinks, setDownloadLinks] = useState<
    { name: string; url: string; size: number }[]
  >([]);

  useEffect(() => {
    if (!outputs?.length) {
      setDownloadLinks([]);
      return;
    }
    const links = outputs.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      size: f.size,
    }));
    setDownloadLinks(links);
    return () => {
      for (const l of links) URL.revokeObjectURL(l.url);
    };
  }, [outputs]);

  const addFiles = useCallback((list: FileList | File[]) => {
    const arr = Array.from(list).filter((f) => isAllowed(f));
    if (!arr.length) return;
    setFiles((prev) => [...prev, ...arr]);
    setOutputs(null);
    setError(null);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onPick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    setOutputs(null);
    setError(null);
  }, []);

  const removeAt = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setOutputs(null);
    setError(null);
  }, []);

  const convert = useCallback(async () => {
    if (!files.length) return;
    setConverting(true);
    setError(null);
    setOutputs(null);
    try {
      const q = Math.min(1, Math.max(0.1, quality));
      const out = await compressManyInOrder(files, { quality: q });
      setOutputs(out);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [files, quality]);

  return (
    <div
      className="min-h-screen bg-white text-neutral-950 [color-scheme:light] font-sans antialiased"
    >
      <Navbar />
      <main className="mx-auto min-h-screen max-w-[720px] bg-white px-5 pb-16 pt-24">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-neutral-950 underline underline-offset-4 hover:opacity-70"
        >
          ← Back home
        </Link>
        <h1 className="mb-2 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-neutral-950">
          WebP converter
        </h1>
        <p className="mb-8 text-base leading-relaxed text-neutral-600">
          Compress images to WebP in the browser. JPEG, PNG, and WebP are
          re-encoded; HEIC/HEIF are left as-is (no WASM).
        </p>

        <div
          className={[
            "rounded-[20px] border-2 border-dashed border-black bg-white px-6 py-10 text-center transition-colors",
            dragOver ? "border-[#7ab82a] bg-[#f7fceb]" : "",
          ].join(" ")}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <p className="mb-4 text-[0.9375rem] text-neutral-800">
            Drop images here or choose files
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
            multiple
            className="sr-only"
            onChange={onPick}
            aria-hidden
          />
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border-0 bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-[0.85] disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => inputRef.current?.click()}
          >
            Select images
          </button>
        </div>

        <div className="mt-5 border-t border-neutral-200 py-4">
          <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-neutral-800">
            Quality (0.1–1)
            <input
              type="number"
              min={0.1}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) =>
                setQuality(Number(e.target.value) || 0.86)
              }
              className="rounded-[10px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950"
            />
          </label>
        </div>

        {files.length > 0 && (
          <>
            <ul className="mt-7 flex list-none flex-col gap-2 p-0">
              {files.map((f, i) => {
                const plan = getCompressionPlan(f);
                return (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-3"
                  >
                    <span
                      className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-950"
                      title={f.name}
                    >
                      {f.name}
                    </span>
                    <span
                      className={[
                        "shrink-0 rounded-md px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider",
                        plan === "bypass"
                          ? "bg-[#fff3e0] text-[#8d5a00]"
                          : "bg-[#e8f5d4] text-[#3d5c1a]",
                      ].join(" ")}
                    >
                      {plan === "bypass" ? "Original" : "→ WebP"}
                    </span>
                    <span className="shrink-0 text-xs text-neutral-500">
                      {formatBytes(f.size)}
                    </span>
                    <button
                      type="button"
                      className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-neutral-100"
                      onClick={() => removeAt(i)}
                      aria-label={`Remove ${f.name}`}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border-0 bg-[#baf038] px-[1.35rem] py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-[#a8d832] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={converting}
                onClick={convert}
              >
                {converting ? "Converting…" : "Convert"}
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={clearFiles}
                disabled={converting}
              >
                Clear all
              </button>
            </div>
          </>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {downloadLinks.length > 0 && (
          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
              Download
            </p>
            <ul className="flex list-none flex-col gap-2 p-0">
              {downloadLinks.map((item, i) => (
                <li
                  key={`out-${item.name}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-3"
                >
                  <span
                    className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-950"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <span className="shrink-0 text-xs text-neutral-500">
                    {formatBytes(item.size)}
                  </span>
                  <a
                    className="inline-flex shrink-0 items-center rounded-full bg-neutral-950 px-3.5 py-2 text-[0.8125rem] font-semibold text-white no-underline hover:opacity-[0.85]"
                    href={item.url}
                    download={item.name}
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
