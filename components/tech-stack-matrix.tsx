"use client";

import { useState } from "react";
import { TECH_SKILLS } from "@/lib/system-data";

export function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "Frontend Architecture",
    "Systems & Cloud",
    "Data & Storage",
    "Tooling & Protocols",
  ];

  const filteredSkills =
    activeCategory === "ALL"
      ? TECH_SKILLS
      : TECH_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="stack" className="w-full py-12 border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
              <span>CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
              Systems Stack Matrix
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs bg-[var(--bg-surface)] p-1 rounded-lg border border-[var(--border-subtle)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-bold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]"
                }`}
              >
                {cat === "ALL" ? "ALL RACKS" : cat.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Stack Rack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={skill.name}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-zinc-500 rounded-lg p-4 font-mono text-xs space-y-3 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider">
                      {skill.category.split(" ")[0]}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {skill.experience}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                          skill.level === "PROD"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors font-sans">
                    {skill.name}
                  </h3>
                </div>

                {/* Highlights List */}
                <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1">
                  {skill.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]"
                    >
                      <span className="text-[var(--accent)] text-[10px]">›</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
