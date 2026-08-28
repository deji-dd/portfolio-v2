"use client";

import { Activity, Cpu, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HARDWARE_SPECS, SYSTEM_IDENTITY } from "@/lib/system-data";

interface LiveTelemetryState {
  uptimeFormatted?: string;
  cores?: number;
  platform?: string;
  kernel?: string;
  hostname?: string;
}

export function CloudLabTelemetry() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([]);
  const [currentLatency, setCurrentLatency] = useState<number | null>(null);
  const [cpuUsage, setCpuUsage] = useState<number>(14.2);
  const [ramUsage, setRamUsage] = useState<number>(44.8);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(false);
  const [liveInfo, setLiveInfo] = useState<LiveTelemetryState | null>(null);

  // 1. Observe when section is in viewport to prevent background polling
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Real telemetry & measured round-trip latency when section is visible & active
  useEffect(() => {
    if (!isInViewport) return;

    let isMounted = true;
    const telemetryEndpoint =
      process.env.NEXT_PUBLIC_TELEMETRY_URL ||
      (process.env.NODE_ENV === "development"
        ? typeof window !== "undefined" &&
          window.location.hostname !== "localhost" &&
          window.location.hostname !== "127.0.0.1"
          ? `http://${window.location.hostname}:3001`
          : "http://127.0.0.1:3001"
        : `https://${SYSTEM_IDENTITY.host}`);

    async function pollTelemetry() {
      if (typeof document !== "undefined" && document.hidden) return;

      const startTime = performance.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(`${telemetryEndpoint}/telemetry`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const elapsed = Math.max(1, Math.round(performance.now() - startTime));
        if (!res.ok) throw new Error("HTTP error");
        const data = await res.json();

        if (!isMounted) return;
        setIsLiveStreaming(true);
        setCurrentLatency(elapsed);
        setLatencyHistory((prev) => [...prev.slice(-19), elapsed]);

        if (typeof data.cpu?.usagePercent === "number") {
          setCpuUsage(data.cpu.usagePercent);
        }
        if (typeof data.memory?.usagePercent === "number") {
          setRamUsage(data.memory.usagePercent);
        }
        setLiveInfo({
          uptimeFormatted: data.system?.uptimeFormatted,
          cores: data.cpu?.cores,
          platform: data.system?.platform,
          kernel: data.system?.kernel,
          hostname: data.system?.hostname,
        });
      } catch {
        if (!isMounted) return;
        setIsLiveStreaming(false);

        // Fallback: Measure edge latency directly via /health so latency is always genuine
        try {
          const fallbackStart = performance.now();
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          const res = await fetch(`/health?_t=${Date.now()}`, {
            method: "GET",
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error("Health check failed");
          await res.text();
          const elapsed = Math.max(1, Math.round(performance.now() - fallbackStart));
          if (!isMounted) return;
          setCurrentLatency(elapsed);
          setLatencyHistory((prev) => [...prev.slice(-19), elapsed]);
        } catch {}
      }
    }

    pollTelemetry();
    const interval = setInterval(pollTelemetry, 3000);

    const handleVisibility = () => {
      if (!document.hidden) {
        pollTelemetry();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isInViewport]);

  // Dynamic P99 calculation from real measured samples
  const sorted = [...latencyHistory].sort((a, b) => a - b);
  const p99 = sorted.length > 0 ? sorted[Math.floor((sorted.length - 1) * 0.99)] : null;

  // Generate SVG Sparkline from genuine latency history
  const svgWidth = 240;
  const svgHeight = 44;
  const minVal = latencyHistory.length > 0 ? Math.max(1, Math.min(...latencyHistory) - 4) : 10;
  const maxVal = latencyHistory.length > 0 ? Math.max(...latencyHistory, minVal + 8) : 40;

  const points =
    latencyHistory.length > 1
      ? latencyHistory
          .map((val, idx) => {
            const x = (idx / (latencyHistory.length - 1)) * svgWidth;
            const y = svgHeight - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 8) - 4;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : `0,${svgHeight / 2} ${svgWidth},${svgHeight / 2}`;

  return (
    <section
      ref={sectionRef}
      id="cloud-lab"
      className="w-full py-12 border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
              <span>LIVE INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
              Deji's Cloud
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono text-xs select-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{SYSTEM_IDENTITY.host}</span>
          </div>
        </div>

        {/* Two-Column Balanced Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Real-Time Host OS Telemetry */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-5 font-mono text-xs space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Activity className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-bold uppercase tracking-wider">SYSTEM_TELEMETRY</span>
                </div>
                {isLiveStreaming ? (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] text-[var(--text-muted)] font-bold bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] px-2 py-0.5 rounded flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-zinc-500" />
                    STANDBY
                  </span>
                )}
              </div>

              {/* Live Sparkline Card */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider">
                    Host Round-Trip Latency
                  </span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {currentLatency !== null ? `${currentLatency}ms` : "--ms"}
                    {p99 !== null ? ` (P99 ~${p99}ms)` : ""}
                  </span>
                </div>

                {/* Sparkline SVG */}
                <div className="w-full overflow-hidden">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-12 stroke-[var(--accent)] fill-none overflow-visible"
                    aria-label="Latency Sparkline"
                  >
                    <path
                      d={`M ${points}`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={`M ${points} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`}
                      fill="var(--accent)"
                      fillOpacity="0.08"
                      stroke="none"
                    />
                  </svg>
                </div>
              </div>

              {/* Live Load Meters */}
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3.5 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-1.5">
                  <div className="flex justify-between text-[var(--text-muted)] text-[10px]">
                    <span>CPU UTILIZATION</span>
                    <span className="text-[var(--text-primary)] font-bold">{cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-surface-hover)] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[var(--accent)] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, cpuUsage * 1.5)}%` }}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-1.5">
                  <div className="flex justify-between text-[var(--text-muted)] text-[10px]">
                    <span>RAM ALLOCATION</span>
                    <span className="text-[var(--text-primary)] font-bold">{ramUsage}%</span>
                  </div>
                  <div className="w-full bg-[var(--bg-surface-hover)] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, ramUsage)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hardware & Host Manifest */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-5 font-mono text-xs space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Cpu className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-bold uppercase tracking-wider">HARDWARE_MANIFEST</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {liveInfo?.kernel ? `Kernel ${liveInfo.kernel}` : "GCP e2-micro // Systemd"}
                </span>
              </div>

              {/* Structured Hardware Spec Rows */}
              <div className="space-y-1 divide-y divide-[var(--border-subtle)] text-[11px]">
                {HARDWARE_SPECS.map((spec) => {
                  const isUptime = spec.key === "Uptime Target" || spec.key === "Uptime";
                  const displayValue =
                    isUptime && liveInfo?.uptimeFormatted ? liveInfo.uptimeFormatted : spec.value;

                  return (
                    <div
                      key={spec.key}
                      className="flex items-center justify-between py-2 first:pt-0"
                    >
                      <span className="text-[var(--text-muted)]">{spec.key}</span>
                      <div className="text-right">
                        <span className="text-[var(--text-primary)] font-semibold">
                          {displayValue}
                        </span>
                        {spec.detail && (
                          <span className="text-[var(--text-muted)] text-[10px] ml-1.5 hidden sm:inline">
                            ({spec.detail})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
