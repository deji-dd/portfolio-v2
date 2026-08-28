"use client";

import { CheckCircle2, Cpu } from "lucide-react";
import type { ProjectItem } from "@/lib/types";

interface PreviewViewerProps {
  preview: ProjectItem["preview"];
  metrics: ProjectItem["metrics"];
  title: string;
}

export function PreviewViewer({ preview, metrics }: PreviewViewerProps) {
  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-4 font-mono text-xs space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-2.5 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] flex flex-col justify-between"
          >
            <span className="text-[10px] text-zinc-500 uppercase tracking-tight line-clamp-1">
              {m.label}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-1 tabular-nums">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Overview & Engineering Highlights */}
      <div className="bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="uppercase font-semibold tracking-wider">{preview.headline}</span>
          </div>
        </div>

        {/* Architectural Highlights Grid */}
        <div className="space-y-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
            Engineering & Architectural Capabilities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {preview.highlights.map((h, i) => (
              <div
                key={i}
                className="p-2.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-2 text-[11px] text-[var(--text-secondary)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="leading-snug">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
