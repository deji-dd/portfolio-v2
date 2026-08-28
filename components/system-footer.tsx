"use client";

import { Activity, Clock, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SYSTEM_IDENTITY } from "@/lib/system-data";

export function SystemFooter() {
  const [lagosTime, setLagosTime] = useState("");
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptimeSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <footer className="w-full bg-[#09090b] border-t border-[#27272a] font-mono text-xs text-zinc-500 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Top Footer Bar with Live Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-white uppercase">SYSTEM_NORMAL</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>LAGOS_NG:</span>
              <span className="text-zinc-200 font-bold tabular-nums">
                {lagosTime || "00:00:00"}
              </span>
            </div>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>SESSION_UPTIME:</span>
              <span className="text-zinc-200 font-bold tabular-nums">
                {formatUptime(uptimeSeconds)}
              </span>
            </div>
          </div>

          {/* Social Anchors */}
          <div className="flex items-center gap-3">
            <a
              href={SYSTEM_IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded bg-[#121215] hover:bg-[var(--bg-surface-hover)] border border-[#27272a] text-zinc-400 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={SYSTEM_IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded bg-[#121215] hover:bg-[var(--bg-surface-hover)] border border-[#27272a] text-zinc-400 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${SYSTEM_IDENTITY.email}`}
              className="p-1.5 rounded bg-[#121215] hover:bg-[var(--bg-surface-hover)] border border-[#27272a] text-zinc-400 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Direct Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href="/resume.pdf"
              download="Ayodeji_Buraimoh_CV.pdf"
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#121215] hover:bg-[var(--bg-surface-hover)] border border-[#27272a] text-[11px] text-zinc-300 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Download Resume"
            >
              <Download className="w-3 h-3 text-[var(--accent)]" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Build Specs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-600">
          <div>
            <span>
              © {new Date().getFullYear()} {SYSTEM_IDENTITY.name}
            </span>
            <span className="mx-2">•</span>
            <span>All System Telemetry Active</span>
          </div>

          <div className="flex items-center gap-3">
            <span>BUILD: v2.4.0 (x86_64)</span>
            <span>•</span>
            <span>NEXT.JS 16 // TAILWIND v4</span>
            <span>•</span>
            <span className="text-zinc-500">COMMIT: 34cbb9a</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
