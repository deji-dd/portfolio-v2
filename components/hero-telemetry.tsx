"use client";

import { ArrowRight, Check, Copy, Layers, MapPin, Terminal } from "lucide-react";
import { useState } from "react";
import { SYSTEM_IDENTITY } from "@/lib/system-data";

export function HeroTelemetry() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SYSTEM_IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full pt-6 pb-12 border-b border-[#27272a]/80">
      {/* Background Micro Grid Layer */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border border-[#27272a] bg-[#121215] p-2.5 rounded-lg mb-8 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="font-semibold text-[11px] uppercase tracking-wider text-white">
              AYODEJIB.DEV
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <MapPin className="w-3 h-3 text-[var(--accent)]" />
            <span>
              <span className="text-zinc-500 uppercase">BASE:</span> {SYSTEM_IDENTITY.location} [
              {SYSTEM_IDENTITY.coordinates}]
            </span>
          </div>
        </div>

        {/* Hero Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.1fr] gap-8 items-start">
          {/* Left: Primary Identity & System Statement */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
                <span>PROFILE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                {SYSTEM_IDENTITY.name}
                <span className="text-[var(--accent)] ml-1 font-mono">_</span>
              </h1>
              <div className="text-xl sm:text-2xl font-semibold text-zinc-200 font-sans tracking-tight">
                {SYSTEM_IDENTITY.role}
              </div>
            </div>

            <div className="space-y-3 text-zinc-400 text-sm leading-relaxed max-w-2xl font-sans">
              <p>
                I engineer <strong>high-throughput web applications</strong> and maintain
                production-grade <strong>containerized infrastructure</strong>.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm font-normal">
                Experienced in deploying enterprise ERP systems, configuring Linux/Windows virtual
                machines, hardening network firewalls, and building modern full-stack platforms with{" "}
                <strong>TypeScript</strong> and <strong>Bun</strong>.
              </p>
            </div>

            {/* Tactical Action Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#architecture"
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-[var(--accent)] hover:opacity-90 text-[var(--accent-foreground)] font-bold uppercase tracking-wider transition-transform active:scale-[0.98] cursor-pointer shadow-[0_0_15px_var(--accent-glow)]"
              >
                <Layers className="w-4 h-4" />
                <span>Inspect Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded bg-[#121215] hover:bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                title="Copy Direct Signal Email"
                aria-label="Copy Direct Signal Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">SIGNAL_KEY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Telemetry Specification Box */}
          <div className="bg-[#121215] border border-[#27272a] rounded-lg p-5 font-mono space-y-4 shadow-xl relative overflow-hidden">
            {/* Corner Industrial Framing Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#3f3f46] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2 text-zinc-300 text-xs">
                <Terminal className="w-4 h-4 text-[var(--accent)]" />
                <span className="uppercase tracking-wider font-bold">CORE_RUNTIME_SPECS</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                SECURE
              </span>
            </div>

            {/* Spec Key-Value Table */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-500">SPECIALIZATION</span>
                <span className="text-zinc-200 font-semibold">Web & SysAdmin Hybrid</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-500">API_SERVER</span>
                <span className="text-[var(--accent)] font-semibold">api.ayodejib.dev</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                <span className="text-zinc-500">PRIMARY_STACK</span>
                <span className="text-[var(--accent)] font-semibold">
                  Next.js / TypeScript / Bun
                </span>
              </div>
            </div>

            {/* Metric Metrics Quad */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {SYSTEM_IDENTITY.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-2.5 rounded bg-[#09090b] border border-[#27272a] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-tight line-clamp-1">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white mt-1 tabular-nums">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
