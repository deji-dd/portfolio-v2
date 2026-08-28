"use client";

import { useState } from "react";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { ProjectCard } from "./project-card";

export function ArchitectureInspectorSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "ALL"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="architecture" className="w-full py-12 border-b border-[#27272a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272a] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--accent)]">
              <span>SYSTEMS SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Production Architectures & Systems
            </h2>
          </div>

          {/* Category Filter Pills or Status Badge */}
          {categories.length > 2 ? (
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs bg-[#121215] p-1 rounded-lg border border-[#27272a]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-bold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                {PROJECTS_DATA.length} Production Architecture{PROJECTS_DATA.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Project List */}
        <div className="space-y-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
