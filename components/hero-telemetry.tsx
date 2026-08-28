"use client";

import { Activity, ArrowRight, Check, Copy, Layers, MapPin, Server, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { SYSTEM_IDENTITY } from "@/lib/system-data";

export function HeroTelemetry() {
  const [vercelPing, setVercelPing] = useState<number | null>(null);
  const [averageLatency, setAverageLatency] = useState<number | null>(null);
  const [sampleCount, setSampleCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Restore stored latency average on client mount
    try {
      const stored = localStorage.getItem("portfolio_edge_latency_samples");
      if (stored) {
        const samples: number[] = JSON.parse(stored);
        if (Array.isArray(samples) && samples.length > 0) {
          const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
          setAverageLatency(avg);
          setSampleCount(samples.length);
        }
      }
    } catch {}

    // 2. Measure current edge latency and record sample
    const measureVercelEdge = async () => {
      const start = performance.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`/health?_t=${Date.now()}`, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("Health check failed");
        await res.text();
        const elapsed = Math.max(1, Math.round(performance.now() - start));
        setVercelPing(elapsed);

        try {
          const raw = localStorage.getItem("portfolio_edge_latency_samples");
          const existing: number[] = raw ? JSON.parse(raw) : [];
          const updated = [...(Array.isArray(existing) ? existing : []), elapsed].slice(-10);
          localStorage.setItem("portfolio_edge_latency_samples", JSON.stringify(updated));

          const avg = Math.round(updated.reduce((a, b) => a + b, 0) / updated.length);
          setAverageLatency(avg);
          setSampleCount(updated.length);
        } catch {}
      } catch {
        setVercelPing((prev) => prev ?? averageLatency ?? null);
      }
    };

    measureVercelEdge();
    const interval = setInterval(measureVercelEdge, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        measureVercelEdge();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="font-semibold text-[11px] uppercase tracking-wider text-white">
                AYODEJIB.DEV
              </span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <MapPin className="w-3 h-3 text-[var(--accent)]" />
              <span>
                <span className="text-zinc-500 uppercase">BASE:</span> {SYSTEM_IDENTITY.location} [
                {SYSTEM_IDENTITY.coordinates}]
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-zinc-500">EDGE_PING:</span>
              <span className="text-emerald-400 tabular-nums font-bold">
                {vercelPing !== null
                  ? `${vercelPing}ms`
                  : averageLatency !== null
                    ? `${averageLatency}ms`
                    : "--ms"}
              </span>
            </div>
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

              <a
                href="#cloud-lab"
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#121215] hover:bg-[#18181b] border border-[#27272a] hover:border-zinc-500 text-zinc-200 hover:text-white font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Server className="w-4 h-4 text-zinc-400" />
                <span>Cloud Lab HUD</span>
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
                <span className="text-zinc-500">FRONTEND_HOST</span>
                <span className="text-zinc-200">Vercel Edge Network</span>
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
              {[
                ...SYSTEM_IDENTITY.stats.slice(0, 2),
                {
                  label: "Average Edge Latency",
                  value: averageLatency !== null ? `~${averageLatency}ms` : "--ms",
                  isLive: true,
                },
                ...SYSTEM_IDENTITY.stats.slice(2),
              ].map((stat) => {
                const isEdgeLatency = "isLive" in stat && stat.isLive;

                return (
                  <div
                    key={stat.label}
                    className="p-2.5 rounded bg-[#09090b] border border-[#27272a] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-tight line-clamp-1">
                        {stat.label}
                      </span>
                      {isEdgeLatency && averageLatency !== null && (
                        <span className="text-[9px] text-emerald-400 font-mono font-semibold flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-white mt-1 tabular-nums flex items-baseline gap-1.5">
                      <span>{stat.value}</span>
                      {isEdgeLatency && sampleCount > 1 && (
                        <span className="text-[9px] text-zinc-500 font-normal font-mono">
                          (n={sampleCount})
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
