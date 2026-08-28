"use client";

import { Activity, Building2, GitCommit } from "lucide-react";
import { SYSTEM_EVENTS } from "@/lib/system-data";

export function SystemEventsLog() {
  return (
    <section id="events" className="w-full py-12 border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
              <span>CAREER PROGRESSION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
              Deployment History
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <GitCommit className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>BRANCH: main (immutable)</span>
          </div>
        </div>

        {/* Timeline Log Container */}
        <div className="space-y-4 font-mono text-xs">
          {SYSTEM_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-zinc-500 rounded-lg p-4 sm:p-5 transition-colors space-y-3 shadow-md"
            >
              {/* Event Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  {event.role && (
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider">
                      {event.role}
                    </span>
                  )}
                  <span className="text-[var(--text-muted)] text-[11px] font-bold">
                    [{event.date}]
                  </span>
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[11px]">
                    <Building2 className="w-3 h-3 text-[var(--text-muted)]" />
                    <span>{event.org}</span>
                  </div>
                </div>

                {event.metrics && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <Activity className="w-3 h-3" />
                    <span>{event.metrics}</span>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight font-sans">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
